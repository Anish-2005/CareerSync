import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const location = searchParams.get('location');
    const type = searchParams.get('type');
    const experience = searchParams.get('experience');
    const remote = searchParams.get('remote');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const query: any = { isActive: true };

    // Text search across title, company, tags, and description
    if (search) {
      query.$text = { $search: search };
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Type filter
    if (type && type !== 'all') {
      query.type = type;
    }

    // Experience filter
    if (experience && experience !== 'all') {
      query.experience = experience;
    }

    // Remote filter
    if (remote !== null && remote !== undefined) {
      query.remote = remote === 'true';
    }

    const jobs = await Job.find(query)
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Transform jobs to include id field
    const transformedJobs = jobs.map((job: any) => ({
      ...job,
      id: job._id.toString(),
    }));

    const total = await Job.countDocuments(query);

    return NextResponse.json({
      jobs: transformedJobs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    const job = new Job({
      ...body,
      postedDate: new Date(),
      isActive: true,
    });

    const savedJob = await job.save();

    return NextResponse.json(savedJob, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}