import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Find all profiles that don't have githubUrl in personalInfo
    const profilesToUpdate = await Profile.find({
      $or: [
        { 'personalInfo.githubUrl': { $exists: false } },
        { 'personalInfo.githubUrl': null }
      ]
    });

    console.log(`Found ${profilesToUpdate.length} profiles to update`);

    // Update each profile to include githubUrl field
    for (const profile of profilesToUpdate) {
      if (!profile.personalInfo) {
        profile.personalInfo = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          location: '',
          linkedinUrl: '',
          githubUrl: '',
          portfolioUrl: '',
          summary: '',
        };
      } else {
        // Ensure githubUrl exists in personalInfo
        if (!profile.personalInfo.hasOwnProperty('githubUrl')) {
          profile.personalInfo.githubUrl = '';
        }
      }

      await profile.save();
      console.log(`Updated profile for user: ${profile.userId}`);
    }

    return NextResponse.json({
      success: true,
      message: `Migration completed successfully. Updated ${profilesToUpdate.length} profiles.`,
      updatedCount: profilesToUpdate.length
    });
  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json({
      success: false,
      error: 'Migration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}