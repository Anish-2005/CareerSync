import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Create a test profile
    const testProfile = new Profile({
      userId: 'test-user-' + Date.now(),
      personalInfo: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
      },
      experience: [],
      education: [],
      skills: [],
      certifications: [],
      projects: [],
      preferences: {
        jobTypes: [],
        locations: [],
        salaryRange: { min: 0, max: 0, currency: 'USD' },
        remoteWork: false,
        relocation: false,
      },
    });

    await testProfile.save();
    console.log('Test profile created:', JSON.stringify(testProfile.personalInfo, null, 2));

    // Check if githubUrl exists
    const githubUrlExists = testProfile.personalInfo.hasOwnProperty('githubUrl');
    const githubUrlValue = testProfile.personalInfo.githubUrl;

    // Clean up
    await Profile.findByIdAndDelete(testProfile._id);
    console.log('Test profile cleaned up');

    return NextResponse.json({
      success: true,
      githubUrlExists,
      githubUrlValue,
      personalInfo: testProfile.personalInfo
    });
  } catch (error) {
    console.error('Test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}