import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { calculateLevel } from "@/lib/levelling";
import { upsertUser, getUserByEmail } from "@/lib/user-store";
import type { CosmeticLoadout } from "@/lib/levelling";

/**
 * Award XP when a module is completed
 * XP is awarded based on:
 * - Base XP: 50 XP for completing a module
 * - Bonus XP: Up to 25 XP based on quiz score (if quiz exists)
 * 
 * IMPORTANT: Only awards XP once per module to prevent farming
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { moduleId, moduleName, quizScore, totalQuestions } = body;

    if (!moduleId || !moduleName) {
      return NextResponse.json(
        { error: "moduleId and moduleName are required" },
        { status: 400 }
      );
    }

    // CRITICAL: Get FULL completedModules list from user store for accurate XP calculation
    // Session only has 10 most recent modules (to prevent 431 errors), but we need all for XP
    // ALWAYS fetch from user store first to get the complete, authoritative list
    let completedModules: Array<{ moduleId: string; moduleName: string; completedAt: string; xpEarned: number; quizScore?: number }> = [];
    
    // Fetch full list from user store if available (this is the source of truth)
    if (session.user.email) {
      try {
        const storedUser = await getUserByEmail(session.user.email);
        if (storedUser?.completedModules && Array.isArray(storedUser.completedModules)) {
          // Use full list from user store - this is the authoritative source
          completedModules = storedUser.completedModules;
        } else {
          // If user store has no modules, fall back to session (might have recent modules)
          completedModules = session.user.profile?.completedModules || [];
        }
      } catch (error) {
        console.error('CRITICAL: Could not fetch completedModules from user store:', error);
        // Fall back to session modules if user store fetch fails
        // This is a fallback - user store should always be available
        completedModules = session.user.profile?.completedModules || [];
      }
    } else {
      // No email in session - use session modules as fallback
      completedModules = session.user.profile?.completedModules || [];
    }
    
    // Check if module is already completed (using full list)
    const alreadyCompleted = completedModules.find(
      (m) => m.moduleId === moduleId
    );

    if (alreadyCompleted) {
      // Calculate current XP from full list
      const currentXPFromModules = completedModules.reduce((sum, m) => sum + m.xpEarned, 0);
      const currentLevelFromXP = calculateLevel(currentXPFromModules);
      
      return NextResponse.json({
        success: false,
        alreadyCompleted: true,
        message: "This module has already been completed",
        xpAwarded: 0,
        currentXP: currentXPFromModules,
        currentLevel: currentLevelFromXP,
      });
    }

    // Base XP for completing a module
    const baseXP = 50;

    // Bonus XP based on quiz performance (if quiz exists)
    let bonusXP = 0;
    if (quizScore !== undefined && totalQuestions && totalQuestions > 0) {
      const percentage = (quizScore / totalQuestions) * 100;
      if (percentage >= 90) {
        bonusXP = 25; // Perfect score bonus
      } else if (percentage >= 70) {
        bonusXP = 15; // Good score bonus
      } else if (percentage >= 50) {
        bonusXP = 10; // Passing score bonus
      }
    }

    const totalXP = baseXP + bonusXP;

    // Calculate current XP from FULL completed modules list (not session's limited list)
    const currentXPFromModules = completedModules.reduce((sum, m) => sum + m.xpEarned, 0);
    const currentLevelFromXP = calculateLevel(currentXPFromModules);
    const newXP = currentXPFromModules + totalXP;
    const newLevel = calculateLevel(newXP);

    // Add module to completed modules
    const newCompletedModule = {
      moduleId,
      moduleName,
      completedAt: new Date().toISOString(),
      xpEarned: totalXP,
      quizScore: quizScore !== undefined ? quizScore : undefined,
    };

    const updatedCompletedModules = [...completedModules, newCompletedModule];

    // CRITICAL: Limit completedModules in session update to prevent 431 errors
    // Store only the 10 most recent modules in the session/JWT token
    // Full list is stored in user store above
    const limitedCompletedModules = updatedCompletedModules.slice(-10);
    
    // Update session with new XP, level, and limited completed modules
    const updatedProfile = {
      ...session.user.profile,
      xp: newXP,
      level: newLevel,
      completedModules: limitedCompletedModules, // Only 10 most recent in JWT
    };

    // Update user in leaderboard store
    if (session.user.email) {
      try {
        // Get existing user to preserve cosmetic loadout if not in session
        const existingUser = await getUserByEmail(session.user.email);
        
        // CRITICAL: Verify we're not overwriting existing modules
        // If existing user has more modules than we're about to save, something is wrong
        if (existingUser?.completedModules && existingUser.completedModules.length > updatedCompletedModules.length) {
          console.error(`[PROGRESS SAVE ERROR] Attempting to save ${updatedCompletedModules.length} modules but user store has ${existingUser.completedModules.length}. This should not happen if fetch worked correctly.`);
          // Merge instead of replace - add any missing modules from existing data
          const existingModuleIds = new Set(existingUser.completedModules.map(m => m.moduleId));
          const newModules = updatedCompletedModules.filter(m => !existingModuleIds.has(m.moduleId));
          updatedCompletedModules = [...existingUser.completedModules, ...newModules];
          console.log(`[PROGRESS SAVE] Merged modules: ${updatedCompletedModules.length} total (${newModules.length} new)`);
        }
        
        // Store FULL completedModules list in user store (not limited to 10)
        await upsertUser({
          email: session.user.email,
          name: session.user.name || 'Anonymous',
          selectedClass: session.user.profile?.selectedClass,
          level: newLevel,
          xp: newXP,
          image: session.user.profile?.profileImage || session.user.image || undefined,
          profileImage: session.user.profile?.profileImage,
          cosmeticLoadout: (session.user.profile as { cosmeticLoadout?: CosmeticLoadout | null } | undefined)?.cosmeticLoadout || existingUser?.cosmeticLoadout,
          completedModules: updatedCompletedModules, // Store FULL list in user store
        } as any);
        
        console.log(`[PROGRESS SAVE] Successfully saved progress for ${session.user.email}: ${updatedCompletedModules.length} modules, ${newXP} XP, Level ${newLevel}`);
      } catch (error) {
        // CRITICAL ERROR: User store save failed - progress will be lost on session expiry
        // Log prominently but don't fail the request (session is already updated)
        console.error('[PROGRESS SAVE ERROR] CRITICAL: Failed to update user store for', session.user.email);
        console.error('[PROGRESS SAVE ERROR] Error details:', error);
        console.error('[PROGRESS SAVE ERROR] Progress will be lost if session expires:', {
          moduleId,
          moduleName,
          xpEarned: totalXP,
          newXP,
          newLevel,
        });
        // Don't throw - session is updated, user sees progress in current session
        // But this needs to be fixed - progress won't persist
      }
    }

    return NextResponse.json({
      success: true,
      xpAwarded: totalXP,
      baseXP,
      bonusXP,
      newXP,
      newLevel,
      levelUp: newLevel > currentLevelFromXP,
      profile: updatedProfile,
      completedModule: newCompletedModule,
    });
  } catch (error) {
    console.error("Error awarding XP:", error);
    return NextResponse.json(
      { error: "Failed to award XP" },
      { status: 500 }
    );
  }
}

