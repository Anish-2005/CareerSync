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
    } else {
      // Ensure all required fields are present for existing profiles
      const updatedPersonalInfo = {
        firstName: profile.personalInfo?.firstName || '',
        lastName: profile.personalInfo?.lastName || '',
        email: profile.personalInfo?.email || '',
        phone: profile.personalInfo?.phone || '',
        location: profile.personalInfo?.location || '',
        linkedinUrl: profile.personalInfo?.linkedinUrl || '',
        githubUrl: profile.personalInfo?.githubUrl || '',
        portfolioUrl: profile.personalInfo?.portfolioUrl || '',
        summary: profile.personalInfo?.summary || '',
      };

      profile.personalInfo = updatedPersonalInfo;
      await profile.save();
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
      console.log('PUT: No valid token found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('PUT: Token verified for user:', decodedToken.uid);

    const body = await request.json();

    // Remove MongoDB internal fields from the update
    const { _id, createdAt, updatedAt, __v, ...updateData } = body;
    console.log('PUT: updateData.personalInfo:', updateData.personalInfo);

    // Ensure the profile exists and has all required fields
    let profile = await Profile.findOne({ userId: decodedToken.uid });
    if (!profile) {
      // Create new profile
      profile = new Profile({
        userId: decodedToken.uid,
        ...updateData
      });
      await profile.save();
    } else {
      // Update existing profile by setting individual fields
      if (updateData.personalInfo) {
        console.log('PUT: Setting personalInfo:', updateData.personalInfo);
        profile.set('personalInfo', updateData.personalInfo);
      }
      if (updateData.experience !== undefined) {
        profile.set('experience', updateData.experience);
      }
      if (updateData.education !== undefined) {
        profile.set('education', updateData.education);
      }
      if (updateData.skills !== undefined) {
        profile.set('skills', updateData.skills);
      }
      if (updateData.certifications !== undefined) {
        profile.set('certifications', updateData.certifications);
      }
      if (updateData.projects !== undefined) {
        profile.set('projects', updateData.projects);
      }
      if (updateData.preferences) {
        profile.set('preferences', updateData.preferences);
      }
      console.log('PUT: Profile before save:', profile.personalInfo);
      await profile.save();
      console.log('PUT: Profile after save:', profile.personalInfo);
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}