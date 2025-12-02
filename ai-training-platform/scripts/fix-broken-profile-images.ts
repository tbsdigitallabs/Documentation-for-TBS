/**
 * Script to fix broken profile images for existing users
 * 
 * This script:
 * 1. Finds all users with broken profile images (missing or invalid URLs)
 * 2. Generates new avatars for them using the same seed (email)
 * 3. Updates their profileImage in the user store
 * 
 * Run with: npx tsx scripts/fix-broken-profile-images.ts
 */

import { getUserByEmail, upsertUser, getAllUsers } from '../src/lib/user-store';

async function generateAvatar(seed: string): Promise<string | null> {
  try {
    // Use DiceBear API to generate avatar (same as onboarding)
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&size=256`;
    
    const response = await fetch(avatarUrl);
    if (!response.ok) {
      // Fallback to identicon
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

async function uploadAvatarToStorage(avatarUrl: string, userEmail: string): Promise<string | null> {
  try {
    // For now, return the DiceBear URL directly
    // In production, you'd want to download and upload to Cloud Storage
    // But for immediate fix, using the DiceBear URL is acceptable
    return avatarUrl;
  } catch (error) {
    console.error(`Error processing avatar for ${userEmail}:`, error);
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
      
      // Generate new avatar using email as seed (consistent)
      const avatarUrl = await generateAvatar(user.email);
      if (!avatarUrl) {
        console.error(`  ❌ Failed to generate avatar`);
        errorCount++;
        continue;
      }
      
      // Upload to storage
      const uploadedUrl = await uploadAvatarToStorage(avatarUrl, user.email);
      if (!uploadedUrl) {
        console.error(`  ❌ Failed to upload avatar`);
        errorCount++;
        continue;
      }
      
      // Update user store
      await upsertUser({
        email: user.email,
        profileImage: uploadedUrl,
      } as any);
      
      console.log(`  ✅ Updated profile image: ${uploadedUrl}\n`);
      fixedCount++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n📊 Summary:');
    console.log(`  ✅ Fixed: ${fixedCount}`);
    console.log(`  ⏭️  Skipped (already valid): ${skippedCount}`);
    console.log(`  ❌ Errors: ${errorCount}`);
    console.log(`  📝 Total: ${allUsers.length}`);
    
  } catch (error) {
    console.error('❌ Error running fix script:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  fixBrokenProfileImages()
    .then(() => {
      console.log('\n✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

export { fixBrokenProfileImages };

