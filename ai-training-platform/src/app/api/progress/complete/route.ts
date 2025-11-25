import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { calculateLevel } from "@/lib/levelling";

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

    // Check if module is already completed
    const completedModules = session.user.profile?.completedModules || [];
    const alreadyCompleted = completedModules.find(
      (m) => m.moduleId === moduleId
    );

    if (alreadyCompleted) {
      return NextResponse.json({
        success: false,
        alreadyCompleted: true,
        message: "This module has already been completed",
        xpAwarded: 0,
        currentXP: session.user.profile?.xp || 0,
        currentLevel: session.user.profile?.level || 1,
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

    // Get current user profile from session
    const currentXP = session.user.profile?.xp || 0;
    const currentLevel = session.user.profile?.level || 1;
    const newXP = currentXP + totalXP;
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

    // Update session with new XP, level, and completed modules
    const updatedProfile = {
      ...session.user.profile,
      xp: newXP,
      level: newLevel,
      completedModules: updatedCompletedModules,
    };

    return NextResponse.json({
      success: true,
      xpAwarded: totalXP,
      baseXP,
      bonusXP,
      newXP,
      newLevel,
      levelUp: newLevel > currentLevel,
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

