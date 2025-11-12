import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';
import User from '@/models/User';
import { verifyFirebaseToken } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    console.log('Profile API: Starting request');
    await dbConnect();
    console.log('Profile API: Database connected');

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    console.log('Profile API: Token verification result:', decodedToken ? 'success' : 'failed');

    if (!decodedToken) {
      console.log('Profile API: No decoded token, returning 401');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Profile API: Looking for profile with userId:', decodedToken.uid);
    let profile = await Profile.findOne({ userId: decodedToken.uid });
    console.log('Profile API: Profile found:', profile ? 'yes' : 'no');

    // If profile doesn't exist, create a default one
    if (!profile) {
      console.log('Profile API: Creating new profile');
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

      console.log('Profile API: Creating profile with data:', userInfo);
      profile = new Profile(userInfo);
      await profile.save();
      console.log('Profile API: Profile saved successfully');

      // Also create/update user record
      console.log('Profile API: Creating/updating user record');
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
      console.log('Profile API: User record created/updated');
    }

    console.log('Profile API: Returning profile data');
    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Profile API: Error occurred:', error);
    console.error('Profile API: Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
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