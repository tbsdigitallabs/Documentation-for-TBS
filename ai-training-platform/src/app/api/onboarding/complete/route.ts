import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profileData = await req.json();

    // Profile data is stored in JWT token, updated via session.update() on client side
    // This endpoint just confirms the update was received
    return NextResponse.json({ 
      success: true,
      message: "Onboarding completed. Profile data will be saved in your session."
    });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return NextResponse.json({ error: "Failed to complete onboarding" }, { status: 500 });
  }
}

