# Future: Data Persistence

This document outlines the current data storage limitations and the planned approach for implementing persistent user data storage.

## Current State

### How Data is Stored Now

User data (profile, progress, XP, completed modules) is stored in **JWT session tokens** via NextAuth.js.

**What this means:**
- Data persists within a browser session
- Data is lost when the user signs out
- Data is lost when the JWT token expires (30 days)
- No server-side storage of user progress

### Current Session Data Structure

```typescript
interface UserProfile {
  bio: string | null;
  role: string | null;
  skills: string[];
  interests: string[];
  learningGoals: string | null;
  experienceLevel: string | null;
  profileImage: string | null;
  selectedClass: string | null;
  hobbies: string | null;
  systems: string | null;
  level: number;
  xp: number;
  completedModules: CompletedModule[];
}

interface CompletedModule {
  moduleId: string;
  moduleName: string;
  completedAt: string;
  xpEarned: number;
  quizScore?: number;
}
```

### Limitations

1. **Progress is not persistent**: If a user signs out, all their progress is lost
2. **No cross-device sync**: Progress made on one device doesn't appear on another
3. **No admin visibility**: Admins cannot view user progress or scores
4. **No analytics**: Cannot track completion rates, popular modules, or average scores

## Recommended Solution: Google Firestore

### Why Firestore?

1. **Native GCP integration**: The platform already deploys to Google Cloud Run
2. **Generous free tier**: 1GB storage, 50K reads/day, 20K writes/day
3. **NoSQL flexibility**: JSON-like documents match our current data structure
4. **Real-time sync**: Built-in support for cross-device updates
5. **Serverless**: No database server to manage

### Proposed Data Model

```
firestore/
├── users/
│   └── {userId}/
│       ├── email: string
│       ├── name: string
│       ├── profileImage: string
│       ├── selectedClass: string
│       ├── experienceLevel: string
│       ├── hobbies: string
│       ├── systems: string
│       ├── bio: string
│       ├── role: string
│       ├── level: number
│       ├── xp: number
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
├── progress/
│   └── {progressId}/
│       ├── userId: string
│       ├── moduleId: string
│       ├── moduleName: string
│       ├── completedAt: timestamp
│       ├── xpEarned: number
│       └── quizScore: number
│
└── quizAttempts/
    └── {attemptId}/
        ├── userId: string
        ├── moduleId: string
        ├── score: number
        ├── totalQuestions: number
        ├── answers: array
        └── completedAt: timestamp
```

## Implementation Plan

### Phase 1: Setup

1. Create Firestore database in GCP Console
2. Add Firebase Admin SDK to the project
3. Configure service account credentials
4. Create Firestore client utility

### Phase 2: User Sync

1. Modify NextAuth callbacks to create/update Firestore user on sign-in
2. Load user data from Firestore on session creation
3. Sync profile updates to Firestore

### Phase 3: Progress Tracking

1. Update `/api/progress/complete` to write to Firestore
2. Load completed modules from Firestore on profile page
3. Implement cross-session XP and level tracking

### Phase 4: Admin Features (Optional)

1. Create admin dashboard to view user progress
2. Add analytics for module completion rates
3. Export functionality for reporting

## Required Environment Variables

```env
# Firestore Configuration
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
# Or use individual credentials:
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## Code Examples

### Firestore Client (future implementation)

```typescript
// src/lib/firestore.ts
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = getApps().length === 0
  ? initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })
  : getApps()[0];

export const db = getFirestore(app);
```

### Saving Progress (future implementation)

```typescript
// In /api/progress/complete/route.ts
import { db } from '@/lib/firestore';

// After calculating XP...
await db.collection('progress').add({
  userId: session.user.id,
  moduleId,
  moduleName,
  completedAt: new Date(),
  xpEarned: totalXP,
  quizScore,
});

// Update user XP
await db.collection('users').doc(session.user.id).update({
  xp: newXP,
  level: newLevel,
  updatedAt: new Date(),
});
```

## Timeline Estimate

- **Phase 1**: 2-3 hours
- **Phase 2**: 3-4 hours
- **Phase 3**: 2-3 hours
- **Phase 4**: 4-6 hours (optional)

**Total**: ~8-16 hours depending on admin feature scope

## Alternative Options

If Firestore doesn't suit requirements:

1. **Supabase**: PostgreSQL-based, generous free tier, good DX
2. **PlanetScale**: MySQL-compatible, serverless, free tier available
3. **Cloud SQL**: Managed MySQL/PostgreSQL, more setup required
4. **MongoDB Atlas**: Document database, free tier available

## References

- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [NextAuth.js Callbacks](https://next-auth.js.org/configuration/callbacks)

