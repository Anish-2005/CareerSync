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

    // Find the user's profile
    const profile = await Profile.findOne({ userId: decodedToken.uid });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Find the document in the profile's documents array
    interface DecodedToken {
        uid: string;
        [key: string]: any;
    }

    interface DocumentItem {
        id: string;
        gridFsId: string | mongoose.Types.ObjectId;
        mimeType?: string;
        originalName?: string;
        [key: string]: any;
    }

    interface ProfileDocumentType {
        userId: string;
        documents: DocumentItem[];
        [key: string]: any;
    }

    interface GridFSFile {
        _id: mongoose.Types.ObjectId;
        length: number;
        contentType?: string;
        filename?: string;
        [key: string]: any;
    }

    // Locate the document in the profile's documents array
    const document = (profile as ProfileDocumentType).documents?.find(
      (d) => d.id === documentId
    ) as DocumentItem | undefined;

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

    // Convert GridFS ID to ObjectId (handle both string and ObjectId stored types)
    const gridFsId = typeof document.gridFsId === 'string'
      ? new mongoose.Types.ObjectId(document.gridFsId)
      : (document.gridFsId as mongoose.Types.ObjectId);

    // Check if file exists
    const files = await bucket.find({ _id: gridFsId }).toArray();
    if (files.length === 0) {
      return NextResponse.json({ error: 'File not found in storage' }, { status: 404 });
    }

    const file = files[0];

    // Create readable stream from GridFS
    const downloadStream = bucket.openDownloadStream(gridFsId);

    // Convert stream to Response
    const response = new Response(downloadStream as any, {
      headers: {
        'Content-Type': document.mimeType || file.contentType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${document.originalName}"`,
        'Content-Length': file.length.toString(),
      },
    });

    return response;

  } catch (error) {
    console.error('File download error:', error);
    return NextResponse.json({
      error: 'File download failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}