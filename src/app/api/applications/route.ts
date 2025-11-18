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

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const application = new JobApplication({
      ...body,
      userId: decodedToken.uid,
      appliedDate: new Date(),
      lastUpdated: new Date(),
    });

    const savedApplication = await application.save();

    return NextResponse.json(savedApplication, { status: 201 });
  } catch (error) {
    console.error('Error creating job application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}