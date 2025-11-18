import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JobApplication from '@/models/JobApplication';
import { verifyFirebaseToken } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const query: any = { userId: decodedToken.uid };

    if (status && status !== 'all') {
      query.status = status;
    }

    const applications = await JobApplication.find(query)
      .sort({ appliedDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Transform applications to include id field
    const transformedApplications = applications.map((app: any) => ({
      ...app,
      id: app._id.toString(),
    }));

    const total = await JobApplication.countDocuments(query);

    return NextResponse.json({
      applications: transformedApplications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    console.log('Database connected successfully');

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    if (!decodedToken) {
      console.error('Firebase token verification failed');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Firebase token verified for user:', decodedToken.uid);

    const body = await request.json();

    // Validate required fields
    if (!body.jobTitle || !body.company || !body.location) {
      console.error('Missing required fields:', { jobTitle: body.jobTitle, company: body.company, location: body.location });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate data types
    if (typeof body.jobTitle !== 'string' || typeof body.company !== 'string' || typeof body.location !== 'string') {
      console.error('Invalid data types:', {
        jobTitle: typeof body.jobTitle,
        company: typeof body.company,
        location: typeof body.location
      });
      return NextResponse.json({ error: 'Invalid data types' }, { status: 400 });
    }

    const application = new JobApplication({
      ...body,
      userId: decodedToken.uid,
      appliedDate: new Date(),
      lastUpdated: new Date(),
    });

    console.log('Creating application with data:', {
      ...body,
      userId: decodedToken.uid,
      appliedDate: new Date(),
      lastUpdated: new Date(),
    });

    const savedApplication = await application.save();

    return NextResponse.json(savedApplication, { status: 201 });
  } catch (error) {
    console.error('Error creating job application:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}