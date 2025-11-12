import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
console.log('Firebase Admin: Initializing Firebase Admin SDK');
console.log('Firebase Admin: Project ID:', process.env.FIREBASE_PROJECT_ID);
console.log('Firebase Admin: Client Email:', process.env.FIREBASE_CLIENT_EMAIL ? 'present' : 'missing');
console.log('Firebase Admin: Private Key present:', !!process.env.FIREBASE_PRIVATE_KEY);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID || 'careersync-59dea',
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log('Firebase Admin: Successfully initialized');
  } catch (error) {
    console.error('Firebase Admin: Failed to initialize:', error);
    throw error;
  }
} else {
  console.log('Firebase Admin: Already initialized');
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();

export default admin;