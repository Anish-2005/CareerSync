import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';

export async function addGithubUrlToExistingProfiles() {
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

    console.log('Migration completed successfully');
    return { success: true, updatedCount: profilesToUpdate.length };
  } catch (error) {
    console.error('Migration failed:', error);
    return { success: false, error: error.message };
  }
}

// For running as a standalone script
if (require.main === module) {
  addGithubUrlToExistingProfiles()
    .then((result) => {
      console.log('Migration result:', result);
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration error:', error);
      process.exit(1);
    });
}