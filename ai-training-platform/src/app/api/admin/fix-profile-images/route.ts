import { NextRequest, NextResponse } from "next/server";
import { getAllUsers, upsertUser } from "@/lib/user-store";
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * One-time API endpoint to fix broken profile images
 * 
 * This endpoint:
 * 1. Checks if it's already been run (via Firestore flag)
 * 2. Runs the profile image fix script if not already run
 * 3. Marks itself as completed in Firestore
 * 
 * Access: POST /api/admin/fix-profile-images
 * 
 * After running successfully, this endpoint will return early on subsequent calls.
 * You can manually delete this file after verifying it worked.
 */

async function generateAvatar(seed: string): Promise<string | null> {
  try {
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&size=256`;
    
    const response = await fetch(avatarUrl);
    if (!response.ok) {
      const fallbackUrl = `https://api.dicebear.com/7.x/identicon/png?seed=${encodeURIComponent(seed)}&size=256`;
      const fallbackResponse = await fetch(fallbackUrl);
      if (!fallbackResponse.ok) {
        return null;
      }
      return fallbackUrl;
    }
    return avatarUrl;
  } catch (error) {
    console.error(`Error generating avatar for ${seed}:`, error);
    return null;
  }
}

async function fixBrokenProfileImages() {
  console.log('🔍 Scanning for users with broken profile images...\n');
  
  try {
    const allUsers = await getAllUsers();
    console.log(`Found ${allUsers.length} total users\n`);
    
    let fixedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    const fixedUsers: string[] = [];
    const errors: string[] = [];
    
    for (const user of allUsers) {
      const hasBrokenImage = 
        !user.profileImage || 
        user.profileImage.startsWith('blob:') ||
        user.profileImage.startsWith('data:') ||
        (user.profileImage.startsWith('http') && !user.profileImage.includes('/api/images/') && !user.profileImage.includes('dicebear.com'));
      
      if (!hasBrokenImage) {
        skippedCount++;
        continue;
      }
      
      console.log(`Fixing profile image for: ${user.email}`);
      
      const avatarUrl = await generateAvatar(user.email);
      if (!avatarUrl) {
        console.error(`  ❌ Failed to generate avatar`);
        errorCount++;
        errors.push(user.email);
        continue;
      }
      
      await upsertUser({
        email: user.email,
        profileImage: avatarUrl,
      } as any);
      
      console.log(`  ✅ Updated profile image: ${avatarUrl}\n`);
      fixedCount++;
      fixedUsers.push(user.email);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n📊 Summary:');
    console.log(`  ✅ Fixed: ${fixedCount}`);
    console.log(`  ⏭️  Skipped (already valid): ${skippedCount}`);
    console.log(`  ❌ Errors: ${errorCount}`);
    console.log(`  📝 Total: ${allUsers.length}`);
    
    return {
      success: true,
      summary: {
        fixed: fixedCount,
        skipped: skippedCount,
        errors: errorCount,
        total: allUsers.length,
      },
      fixedUsers,
      errors,
    };
  } catch (error) {
    console.error('❌ Error running fix script:', error);
    throw error;
  }
}

const FLAG_COLLECTION = 'admin_flags';
const FLAG_DOC_ID = 'profile-images-fixed';

function getFirestoreInstance() {
  if (getApps().length === 0) {
    initializeApp();
  }
  return getFirestore();
}

async function hasAlreadyRun(): Promise<boolean> {
  try {
    const db = getFirestoreInstance();
    const flagDoc = await db.collection(FLAG_COLLECTION).doc(FLAG_DOC_ID).get();
    return flagDoc.exists && flagDoc.data()?.completed === true;
  } catch (error) {
    // If document doesn't exist, it hasn't run yet
    return false;
  }
}

async function markAsCompleted() {
  try {
    const db = getFirestoreInstance();
    await db.collection(FLAG_COLLECTION).doc(FLAG_DOC_ID).set({
      completed: true,
      completedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to mark as completed (non-critical):', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check if already run
    const alreadyRun = await hasAlreadyRun();
    if (alreadyRun) {
      return NextResponse.json({
        message: 'Profile image fix has already been completed. This endpoint can be safely deleted.',
        alreadyCompleted: true,
      });
    }
    
    console.log('🚀 Starting profile image fix script...');
    
    const result = await fixBrokenProfileImages();
    
    // Mark as completed in Firestore
    await markAsCompleted();
    
    return NextResponse.json({
      message: 'Profile images fixed successfully. This endpoint can now be safely deleted.',
      ...result,
    });
  } catch (error) {
    console.error('❌ Error in fix-profile-images endpoint:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fix profile images',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

