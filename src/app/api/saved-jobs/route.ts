import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SavedJob from '@/models/SavedJob';
import Job from '@/models/Job';
import { verifyFirebaseToken } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const savedJobs = await SavedJob.find({ userId: decodedToken.uid })
      .sort({ savedAt: -1 })
      .populate('jobId')
      .lean();

    // Filter out any saved jobs where the job no longer exists
    const validSavedJobs = savedJobs.filter(savedJob => savedJob.jobId);

    // Transform saved jobs to include id fields
    const transformedSavedJobs = validSavedJobs.map((savedJob: any) => ({
      ...savedJob,
      id: savedJob._id.toString(),
      jobId: {
        ...savedJob.jobId,
        id: savedJob.jobId._id.toString(),
      },
    }));

    return NextResponse.json({ savedJobs: transformedSavedJobs });
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { jobId, notes } = await request.json();

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Check if already saved
    const existingSavedJob = await SavedJob.findOne({
      userId: decodedToken.uid,
      jobId: jobId,
    });

    if (existingSavedJob) {
      return NextResponse.json({ error: 'Job already saved' }, { status: 409 });
    }

    const savedJob = new SavedJob({
      userId: decodedToken.uid,
      jobId: jobId,
      notes: notes || '',
    });

    const savedSavedJob = await savedJob.save();

    return NextResponse.json(savedSavedJob, { status: 201 });
  } catch (error) {
    console.error('Error saving job:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const result = await SavedJob.findOneAndDelete({
      userId: decodedToken.uid,
      jobId: jobId,
    });

    if (!result) {
      return NextResponse.json({ error: 'Saved job not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Job unsaved successfully' });
  } catch (error) {
    console.error('Error unsaving job:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}