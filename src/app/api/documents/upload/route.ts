import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';
import { verifyFirebaseToken } from '@/lib/auth-middleware';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload request received');
    await dbConnect();
    console.log('Database connected');

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    if (!decodedToken) {
      console.log('Token verification failed');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.log('Token verified for user:', decodedToken.uid);

    // Get the form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    console.log('File received:', file.name, 'Size:', file.size, 'Type:', file.type);

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
      console.log('Database connection failed - no db object');
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    console.log('Database connection OK');

    // Create GridFS bucket
    const bucket = new GridFSBucket(db, {
      bucketName: 'documents'
    });
    console.log('GridFS bucket created');

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log('File converted to buffer, size:', buffer.length);

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const filename = `${timestamp}_${randomId}_${file.name}`;
    console.log('Generated filename:', filename);

    // Upload file to GridFS
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: file.type,
      metadata: {
        originalName: file.name,
        uploadedBy: decodedToken.uid,
        uploadedAt: new Date()
      }
    });

    console.log('Upload stream created');

    uploadStream.end(buffer);

    // Wait for upload to complete
    await new Promise((resolve, reject) => {
      uploadStream.on('finish', () => {
        console.log('Upload finished successfully');
        resolve(void 0);
      });
      uploadStream.on('error', (err) => {
        console.error('Upload stream error:', err);
        reject(err);
      });
    });

    // Get the GridFS file ID
    const gridFsId = uploadStream.id.toString();
    console.log('GridFS ID:', gridFsId);

    // Find or create user profile
    let profile = await Profile.findOne({ userId: decodedToken.uid });
    console.log('Profile found:', !!profile);

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
      console.log('Created new profile');
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

    console.log('Adding document to profile:', documentEntry);
    profile.documents.push(documentEntry);
    await profile.save();
    console.log('Profile saved successfully, documents count:', profile.documents.length);
    console.log('Saved documents:', profile.documents);

    return NextResponse.json({
      success: true,
      document: documentEntry,
      message: 'File uploaded successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('File upload error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json({
      error: 'File upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}