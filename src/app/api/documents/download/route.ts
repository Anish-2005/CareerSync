import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';
import { verifyFirebaseToken } from '@/lib/auth-middleware';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get document ID from URL
    const url = new URL(request.url);
    const documentId = url.searchParams.get('id');

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
    }

    // Find the document in user's profile
    const profile = await Profile.findOne({
      userId: decodedToken.uid,
      'documents.id': documentId
    });

    if (!profile) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Get the document entry
    const document = profile.documents.find(doc => doc.id === documentId);
    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Get MongoDB connection
    const conn = mongoose.connection;
    const db = conn.db;

    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    // Create GridFS bucket
    const bucket = new GridFSBucket(db, {
      bucketName: 'documents'
    });

    // Convert GridFS ID to ObjectId
    const gridFsId = new mongoose.Types.ObjectId(document.gridFsId);

    // Check if file exists
    const files = await bucket.find({ _id: gridFsId }).toArray();
    if (files.length === 0) {
      return NextResponse.json({ error: 'File not found in storage' }, { status: 404 });
    }

    // Create download stream
    const downloadStream = bucket.openDownloadStream(gridFsId);

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    await new Promise((resolve, reject) => {
      downloadStream.on('data', (chunk) => chunks.push(chunk));
      downloadStream.on('end', resolve);
      downloadStream.on('error', reject);
    });

    const buffer = Buffer.concat(chunks);

    // Return file with appropriate headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': document.mimeType,
        'Content-Disposition': `attachment; filename="${document.originalName}"`,
        'Content-Length': buffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('File download error:', error);
    return NextResponse.json({
      error: 'File download failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}