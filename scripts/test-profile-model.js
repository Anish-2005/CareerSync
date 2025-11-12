import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';

export async function testProfileModel() {
  try {
    await dbConnect();

    // Create a test profile
    const testProfile = new Profile({
      userId: 'test-user-123',
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
    console.log('githubUrl field exists:', testProfile.personalInfo.hasOwnProperty('githubUrl'));
    console.log('githubUrl value:', testProfile.personalInfo.githubUrl);

    // Clean up
    await Profile.findByIdAndDelete(testProfile._id);
    console.log('Test profile cleaned up');

    return { success: true, githubUrlExists: testProfile.personalInfo.hasOwnProperty('githubUrl') };
  } catch (error) {
    console.error('Test failed:', error);
    return { success: false, error: error.message };
  }
}

// For running as a standalone script
if (require.main === module) {
  testProfileModel()
    .then((result) => {
      console.log('Test result:', result);
      process.exit(0);
    })
    .catch((error) => {
      console.error('Test error:', error);
      process.exit(1);
    });
}