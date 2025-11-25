import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export interface OnboardingQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "text";
  required: boolean;
  options?: { value: string; label: string; description?: string }[];
  placeholder?: string;
  helpText?: string;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Adventure-themed onboarding questions with multiple choice
    const questions: OnboardingQuestion[] = [
      {
        id: "class",
        question: "What class do you identify with in your quest?",
        type: "multiple-choice",
        required: true,
        options: [
          {
            value: "Artificer",
            label: "Artificer",
            description: "Master the tools of code and creation",
          },
          {
            value: "Bard",
            label: "Bard",
            description: "Weave visual magic and creative wonders",
          },
          {
            value: "Paladin",
            label: "Paladin",
            description: "Lead quests and manage the realm",
          },
          {
            value: "Storyteller",
            label: "Storyteller",
            description: "Craft tales and shape narratives",
          },
          {
            value: "Rogue",
            label: "Rogue",
            description: "Navigate deals and expand territories",
          },
        ],
      },
      {
        id: "experience",
        question: "How would you describe your experience level with AI magic?",
        type: "multiple-choice",
        required: true,
        options: [
          {
            value: "Novice",
            label: "Novice",
            description: "Just starting my journey",
          },
          {
            value: "Apprentice",
            label: "Apprentice",
            description: "I've dabbled with AI tools",
          },
          {
            value: "Master",
            label: "Master",
            description: "I'm experienced with AI workflows",
          },
        ],
      },
      {
        id: "hobbies",
        question: "What hobbies or interests do you have?",
        type: "text",
        required: false,
        placeholder: "Share your interests (this helps us create future modules tailored to you)",
        helpText: "Optional: This helps us create future modules tailored to you",
      },
      {
        id: "systems",
        question: "What systems or tools do you use outside of Asana, Google Workspace, and Close CRM?",
        type: "text",
        required: false,
        placeholder: "List any other tools or systems you use",
        helpText: "Optional: Help us identify tools we might not know about",
      },
    ];

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    // Return default questions on error
    return NextResponse.json({
      questions: [
        {
          id: "class",
          question: "What class do you identify with?",
          type: "multiple-choice",
          required: true,
          options: [
            { value: "Artificer", label: "Artificer" },
            { value: "Bard", label: "Bard" },
            { value: "Paladin", label: "Paladin" },
            { value: "Storyteller", label: "Storyteller" },
            { value: "Rogue", label: "Rogue" },
          ],
        },
      ],
    });
  }
}
