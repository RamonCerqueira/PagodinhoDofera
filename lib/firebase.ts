import { initializeApp, getApps, getApp } from 'firebase/app';
<<<<<<< codex/create-professional-artist-website-9nh7vr
import { getAuth, type Auth } from 'firebase/auth';
=======
import { getAuth } from 'firebase/auth';
>>>>>>> main
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
<<<<<<< codex/create-professional-artist-website-9nh7vr
export const auth: Auth | null = typeof window !== 'undefined' ? getAuth(app) : null;
=======
export const auth = getAuth(app);
>>>>>>> main
