import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';
import User from '@/models/User';
import { verifyFirebaseToken } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    console.log('GET: Starting profile fetch');
    await dbConnect();
    console.log('GET: Database connected');

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request);
    if (!decodedToken) {
      console.log('GET: No valid token found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('GET: Token verified for user:', decodedToken.uid);

    let profile = await Profile.findOne({ userId: decodedToken.uid });
    console.log('GET: Profile found:', !!profile);

    // If profile doesn't exist, create a default one
    if (!profile) {
      console.log('GET: Creating new profile');
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
        documents: [], // Initialize documents array
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

      try {
        profile = new Profile(userInfo);
        await profile.save();
        console.log('GET: Created new profile successfully');
      } catch (saveError) {
        console.error('GET: Error saving new profile:', saveError);
        throw saveError;
      }
    } else {
      // Ensure documents field exists for existing profiles
      if (!profile.documents) {
        profile.documents = [];
        await profile.save();
        console.log('GET: Added documents field to existing profile');
      }
    }

    console.log('GET: Returning profile');
    return NextResponse.json({ profile });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('GET: Error fetching profile:', error);
    console.error('GET: Error stack:', error instanceof Error ? error.stack : 'Unknown error');
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
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

    // Ensure the profile exists and has all required fields
    let profile = await Profile.findOne({ userId: decodedToken.uid });
    if (!profile) {
      // Create new profile with explicit personalInfo fields
      const defaultPersonalInfo = {
        firstName: updateData.personalInfo?.firstName || '',
        lastName: updateData.personalInfo?.lastName || '',
        email: updateData.personalInfo?.email || '',
        phone: updateData.personalInfo?.phone || '',
        location: updateData.personalInfo?.location || '',
        linkedinUrl: updateData.personalInfo?.linkedinUrl || '',
        githubUrl: updateData.personalInfo?.githubUrl || '', // Explicitly include githubUrl
        portfolioUrl: updateData.personalInfo?.portfolioUrl || '',
        summary: updateData.personalInfo?.summary || '',
      };

      profile = new Profile({
        userId: decodedToken.uid,
        personalInfo: defaultPersonalInfo,
        experience: updateData.experience || [],
        education: updateData.education || [],
        skills: updateData.skills || [],
        certifications: updateData.certifications || [],
        projects: updateData.projects || [],
        documents: updateData.documents || [], // Include documents
        preferences: updateData.preferences || {
          jobTypes: [],
          locations: [],
          salaryRange: { min: 0, max: 0, currency: 'USD' },
          remoteWork: false,
          relocation: false,
        },
      });
      await profile.save();
      console.log('Created new profile via PUT with githubUrl:', profile.personalInfo.githubUrl);
    } else {
      // Update existing profile by directly modifying and saving
      if (updateData.personalInfo) {
        // Update each field individually to ensure Mongoose detects changes
        profile.personalInfo.firstName = updateData.personalInfo.firstName || '';
        profile.personalInfo.lastName = updateData.personalInfo.lastName || '';
        profile.personalInfo.email = updateData.personalInfo.email || '';
        profile.personalInfo.phone = updateData.personalInfo.phone || '';
        profile.personalInfo.location = updateData.personalInfo.location || '';
        profile.personalInfo.linkedinUrl = updateData.personalInfo.linkedinUrl || '';
        profile.personalInfo.githubUrl = updateData.personalInfo.githubUrl || '';
        profile.personalInfo.portfolioUrl = updateData.personalInfo.portfolioUrl || '';
        profile.personalInfo.summary = updateData.personalInfo.summary || '';
        // Mark the personalInfo subdocument as modified
        profile.markModified('personalInfo');
      }
      if (updateData.experience !== undefined) {
        profile.experience = updateData.experience;
      }
      if (updateData.education !== undefined) {
        profile.education = updateData.education;
      }
      if (updateData.skills !== undefined) {
        profile.skills = updateData.skills;
      }
      if (updateData.certifications !== undefined) {
        profile.certifications = updateData.certifications;
      }
      if (updateData.projects !== undefined) {
        profile.projects = updateData.projects;
      }
      if (updateData.documents !== undefined) {
        profile.documents = updateData.documents;
      }
      if (updateData.preferences) {
        profile.preferences = updateData.preferences;
      }
      await profile.save();
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}