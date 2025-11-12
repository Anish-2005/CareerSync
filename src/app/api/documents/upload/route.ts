import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';
import { verifyFirebaseToken } from '@/lib/auth-middleware';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type (only allow PDFs, DOC, DOCX, etc.)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: 'Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'
      }, { status: 400 });
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({
        error: 'File too large. Maximum size is 10MB.'
      }, { status: 400 });
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

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const filename = `${timestamp}_${randomId}_${file.name}`;

    // Upload file to GridFS
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: file.type,
      metadata: {
        originalName: file.name,
        uploadedBy: decodedToken.uid,
        uploadedAt: new Date()
      }
    });

    uploadStream.end(buffer);

    // Wait for upload to complete
    await new Promise((resolve, reject) => {
      uploadStream.on('finish', resolve);
      uploadStream.on('error', reject);
    });

    // Get the GridFS file ID
    const gridFsId = uploadStream.id.toString();

    // Find or create user profile
    let profile = await Profile.findOne({ userId: decodedToken.uid });
    if (!profile) {
      // Create new profile
      const userInfo = {
        userId: decodedToken.uid,
        personalInfo: {
          email: decodedToken.email || '',
          firstName: decodedToken.name?.split(' ')[0] || '',
          lastName: decodedToken.name?.split(' ').slice(1).join(' ') || '',
          phone: '',
          location: '',
          linkedinUrl: '',
          githubUrl: '',
          portfolioUrl: '',
          summary: '',
        },
        experience: [],
        education: [],
        skills: [],
        certifications: [],
        projects: [],
        documents: [],
        preferences: {
          jobTypes: [],
          locations: [],
          salaryRange: { min: 0, max: 0, currency: 'USD' },
          remoteWork: false,
          relocation: false,
        },
      };
      profile = new Profile(userInfo);
    }

    // Add document to profile
    const documentEntry = {
      id: Date.now().toString(),
      filename: filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      uploadedAt: new Date(),
      gridFsId: gridFsId,
    };

    profile.documents.push(documentEntry);
    await profile.save();

    return NextResponse.json({
      success: true,
      document: documentEntry,
      message: 'File uploaded successfully'
    });

  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({
      error: 'File upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}