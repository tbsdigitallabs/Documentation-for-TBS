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
    // On Cloud Run, ADC automatically detects project from metadata server
    // For local dev, set GOOGLE_APPLICATION_CREDENTIALS env var to point to service account key
    app = initializeApp();
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

    // Build user object, only including fields that are not undefined
    const updatedUser: any = {
      id: user.id || user.email,
      email: user.email,
      name: user.name || existingData?.name || 'Anonymous',
      level: user.level ?? existingData?.level ?? 1,
      xp: user.xp ?? existingData?.xp ?? 0,
      completedModules: (user as any).completedModules ?? existingData?.completedModules ?? [],
      lastUpdated: new Date().toISOString(),
    };

    // Add optional fields only if they have values (avoid undefined)
    if (user.selectedClass !== undefined || existingData?.selectedClass !== undefined) {
      updatedUser.selectedClass = user.selectedClass ?? existingData?.selectedClass ?? null;
    }
    if (user.image !== undefined || existingData?.image !== undefined) {
      updatedUser.image = user.image ?? existingData?.image ?? null;
    }
    if (user.profileImage !== undefined || existingData?.profileImage !== undefined) {
      updatedUser.profileImage = user.profileImage ?? existingData?.profileImage ?? null;
    }
    if (user.cosmeticLoadout !== undefined || existingData?.cosmeticLoadout !== undefined) {
      updatedUser.cosmeticLoadout = user.cosmeticLoadout ?? existingData?.cosmeticLoadout ?? null;
    }

    // Preserve higher XP/level if not provided
    if (existingData) {
      if (user.level === undefined && existingData.level > updatedUser.level) {
        updatedUser.level = existingData.level;
      }
      if (user.xp === undefined && existingData.xp > updatedUser.xp) {
        updatedUser.xp = existingData.xp;
      }
    }

    // Remove any remaining undefined values (Firestore doesn't allow undefined)
    const cleanedUser = Object.fromEntries(
      Object.entries(updatedUser).filter(([_, value]) => value !== undefined)
    );

    await userRef.set(cleanedUser, { merge: true, ignoreUndefinedProperties: true });
    return cleanedUser as StoredUser;
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

