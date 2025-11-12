import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export async function verifyFirebaseToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the token with Firebase Admin SDK
    const decodedToken = await adminAuth.verifyIdToken(token);

    return decodedToken;
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return null;
  }
}