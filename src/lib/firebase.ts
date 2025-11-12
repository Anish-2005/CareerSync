import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAMKWxPpeRM38mHcWMxHQ9013zRuI8I71U",
  authDomain: "careersync-59dea.firebaseapp.com",
  projectId: "careersync-59dea",
  storageBucket: "careersync-59dea.firebasestorage.app",
  messagingSenderId: "872681532513",
  appId: "1:872681532513:web:23111e4fdadc884b430e20",
  measurementId: "G-TCK21NKE00"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app