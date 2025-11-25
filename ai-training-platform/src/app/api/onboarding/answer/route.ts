import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { validateAnswer, sanitizeString } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { questionId, answer, currentData } = body;

    if (!questionId || !answer) {
      return NextResponse.json({ error: "Question ID and answer are required" }, { status: 400 });
    }

    let updatedProfile = { ...(currentData || {}) };

    // Process answer based on question ID
    if (questionId === "class") {
      // Class is selected directly from multiple choice
      updatedProfile.selectedClass = sanitizeString(String(answer), 100);
    } else if (questionId === "experience") {
      // Experience level is selected directly from multiple choice
      updatedProfile.experienceLevel = sanitizeString(String(answer), 50);
    } else if (questionId === "hobbies") {
      // Hobbies is free text
      const sanitized = validateAnswer(answer);
      updatedProfile.hobbies = sanitized || null;
    } else if (questionId === "systems") {
      // Systems is free text
      const sanitized = validateAnswer(answer);
      updatedProfile.systems = sanitized || null;
    }

    return NextResponse.json({ updatedProfile });
  } catch (error) {
    console.error("Error processing answer:", error);
    return NextResponse.json({ error: "Failed to process answer" }, { status: 500 });
  }
}
