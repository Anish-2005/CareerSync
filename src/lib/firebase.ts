import { initializeApp, getApps, FirebaseOptions } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Load Firebase config from environment variables.
// Use NEXT_PUBLIC_ prefix for values that must be available in the browser.
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined,
}

// Basic validation in development to catch missing env values early.
if (process.env.NODE_ENV === 'development') {
  const missing = Object.entries(firebaseConfig)
    .filter(([, v]) => v === '' || v === undefined)
    .map(([k]) => k)
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.warn('[firebase] Missing environment variables for:', missing.join(', '))
  }
}

// Initialize Firebase app only once (useful for hot-reload in development)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app