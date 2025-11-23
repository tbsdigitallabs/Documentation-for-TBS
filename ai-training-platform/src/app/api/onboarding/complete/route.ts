import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profileData = await req.json();

    // Update user profile
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        onboardingCompleted: true,
        profileImage: profileData.profileImage || null,
        bio: profileData.bio || null,
        role: profileData.role || null,
        skills: profileData.skills ? JSON.stringify(profileData.skills) : null,
        interests: profileData.interests ? JSON.stringify(profileData.interests) : null,
        learningGoals: profileData.learningGoals || null,
        experienceLevel: profileData.experienceLevel || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return NextResponse.json({ error: "Failed to complete onboarding" }, { status: 500 });
  }
}

