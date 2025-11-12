import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export async function verifyFirebaseToken(request: NextRequest) {
  try {
    console.log('Auth Middleware: Starting token verification');
    const authHeader = request.headers.get('authorization');
    console.log('Auth Middleware: Auth header present:', !!authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Auth Middleware: Invalid or missing auth header');
      return null;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    console.log('Auth Middleware: Token extracted, length:', token.length);

    // Verify the token with Firebase Admin SDK
    console.log('Auth Middleware: Verifying token with Firebase');
    const decodedToken = await adminAuth.verifyIdToken(token);
    console.log('Auth Middleware: Token verified successfully, UID:', decodedToken.uid);

    return decodedToken;
  } catch (error) {
    console.error('Auth Middleware: Error verifying Firebase token:', error);
    console.error('Auth Middleware: Error details:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}