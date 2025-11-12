import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';
import User from '@/models/User';
import { verifyFirebaseToken } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let profile = await Profile.findOne({ userId: decodedToken.uid });

    // If profile doesn't exist, create a default one
    if (!profile) {
      // Get user info from Firebase token
      const userInfo = {
        userId: decodedToken.uid,
        personalInfo: {
          email: decodedToken.email || '',
          firstName: decodedToken.name?.split(' ')[0] || '',
          lastName: decodedToken.name?.split(' ').slice(1).join(' ') || '',
        },
        experience: [],
        education: [],
        skills: [],
        certifications: [],
        projects: [],
        preferences: {
          jobTypes: [],
          locations: [],
          salaryRange: {
            min: 0,
            max: 0,
            currency: 'USD',
          },
          remoteWork: false,
          relocation: false,
        },
      };

      profile = new Profile(userInfo);
      await profile.save();

      // Also create/update user record
      await User.findOneAndUpdate(
        { firebaseUid: decodedToken.uid },
        {
          firebaseUid: decodedToken.uid,
          email: decodedToken.email || '',
          displayName: decodedToken.name || '',
          photoURL: decodedToken.picture || '',
        },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const profile = await Profile.findOneAndUpdate(
      { userId: decodedToken.uid },
      body,
      { new: true, runValidators: true, upsert: true }
    );

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}