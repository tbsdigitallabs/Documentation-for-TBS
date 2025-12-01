/**
 * Firestore adapter for user data storage
 * Replaces file-based storage with persistent Firestore database
 */

import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let firestore: Firestore | null = null;

function getFirestoreInstance(): Firestore {
  if (firestore) {
    return firestore;
  }

  // Initialize Firebase Admin if not already initialized
  let app: App;
  if (getApps().length === 0) {
    // Use Application Default Credentials (ADC) in Cloud Run
    // In local dev, set GOOGLE_APPLICATION_CREDENTIALS or use service account key
    try {
      // In Cloud Run, ADC is automatically available via the service account
      // No explicit credentials needed - Firebase Admin SDK will use ADC
      app = initializeApp({
        projectId: process.env.GCP_PROJECT_ID || 'learninglab-478822',
      });
    } catch (error) {
      console.error('Firebase Admin initialization error:', error);
      // Fallback: try without explicit config (uses ADC)
      app = initializeApp();
    }
  } else {
    app = getApps()[0];
  }

  firestore = getFirestore(app);
  return firestore;
}

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  selectedClass?: string;
  level: number;
  xp: number;
  image?: string;
  profileImage?: string;
  cosmeticLoadout?: {
    equippedFrame?: string;
    equippedEffect?: string;
    equippedBadge?: string;
    equippedNameplate?: string;
    equippedTitlebar?: string;
    equippedTitle?: string;
  };
  completedModules?: Array<{
    moduleId: string;
    moduleName: string;
    completedAt: string;
    xpEarned: number;
    quizScore?: number;
  }>;
  lastUpdated: string;
}

const COLLECTION_NAME = 'users';

export async function upsertUser(user: Partial<StoredUser> & { email: string }): Promise<StoredUser> {
  try {
    const db = getFirestoreInstance();
    const userRef = db.collection(COLLECTION_NAME).doc(user.email);
    
    const existingDoc = await userRef.get();
    const existingData = existingDoc.exists ? (existingDoc.data() as StoredUser) : null;
    
    const updatedUser: StoredUser = {
      id: user.id || user.email,
      email: user.email,
      name: user.name || existingData?.name || 'Anonymous',
      selectedClass: user.selectedClass ?? existingData?.selectedClass,
      level: user.level ?? existingData?.level ?? 1,
      xp: user.xp ?? existingData?.xp ?? 0,
      // Preserve existing values if not provided (using ?? operator)
      image: user.image ?? existingData?.image,
      profileImage: user.profileImage ?? existingData?.profileImage,
      cosmeticLoadout: user.cosmeticLoadout ?? existingData?.cosmeticLoadout,
      completedModules: (user as any).completedModules ?? existingData?.completedModules ?? [],
      lastUpdated: new Date().toISOString(),
    };

    // Preserve higher XP/level if not provided
    if (existingData) {
      if (user.level === undefined && existingData.level > updatedUser.level) {
        updatedUser.level = existingData.level;
      }
      if (user.xp === undefined && existingData.xp > updatedUser.xp) {
        updatedUser.xp = existingData.xp;
      }
    }

    await userRef.set(updatedUser, { merge: true });
    return updatedUser;
  } catch (error) {
    console.error('Error upserting user to Firestore:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<StoredUser | null> {
  try {
    const db = getFirestoreInstance();
    const userDoc = await db.collection(COLLECTION_NAME).doc(email).get();
    
    if (!userDoc.exists) {
      return null;
    }
    
    return userDoc.data() as StoredUser;
  } catch (error) {
    console.error('Error getting user from Firestore:', error);
    return null;
  }
}

export async function getLeaderboard(): Promise<StoredUser[]> {
  try {
    const db = getFirestoreInstance();
    const EXCLUDED_EMAILS = [
      'dev@tbsdigitallabs.com.au',
      'test@tbsdigitallabs.com.au',
    ];

    const snapshot = await db.collection(COLLECTION_NAME)
      .orderBy('xp', 'desc')
      .get();

    const users = snapshot.docs
      .map(doc => doc.data() as StoredUser)
      .filter(user => !EXCLUDED_EMAILS.includes(user.email.toLowerCase()));

    return users;
  } catch (error) {
    console.error('Error getting leaderboard from Firestore:', error);
    return [];
  }
}

