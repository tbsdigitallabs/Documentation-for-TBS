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

    // Onboarding questions with clear, plain language descriptions
    const questions: OnboardingQuestion[] = [
      {
        id: "class",
        question: "What's your role at TBS Digital Labs?",
        type: "multiple-choice",
        required: true,
        options: [
          {
            value: "Artificer",
            label: "Artificer (Developer)",
            description: "I write code, build applications, and work with technical systems",
          },
          {
            value: "Bard",
            label: "Bard (Designer)",
            description: "I create visual designs, user interfaces, and brand assets",
          },
          {
            value: "Paladin",
            label: "Paladin (Project Manager)",
            description: "I manage projects, coordinate teams, and ensure deliverables are met",
          },
          {
            value: "Storyteller",
            label: "Storyteller (Content Creator & PR)",
            description: "I write content, manage communications, and handle public relations",
          },
          {
            value: "Rogue",
            label: "Rogue (Sales & Business Development)",
            description: "I work with clients, manage sales, and develop business opportunities",
          },
        ],
      },
      {
        id: "experience",
        question: "What's your experience level with AI tools?",
        type: "multiple-choice",
        required: true,
        options: [
          {
            value: "Novice",
            label: "Novice",
            description: "I'm new to AI tools and want to learn the basics",
          },
          {
            value: "Apprentice",
            label: "Apprentice",
            description: "I've used some AI tools but want to improve my skills",
          },
          {
            value: "Master",
            label: "Master",
            description: "I'm experienced with AI and want to learn advanced techniques",
          },
        ],
      },
      {
        id: "hobbies",
        question: "What are your hobbies or interests outside of work?",
        type: "text",
        required: false,
        placeholder: "e.g., photography, gaming, cooking, sports...",
        helpText: "Optional: This helps us create future training modules that might interest you",
      },
      {
        id: "systems",
        question: "What other tools or systems do you regularly use at work?",
        type: "text",
        required: false,
        placeholder: "e.g., Slack, Notion, Figma, GitHub, HubSpot...",
        helpText: "Optional: List any tools beyond Asana, Google Workspace, and Close CRM that you use regularly",
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
          question: "What's your role at TBS Digital Labs?",
          type: "multiple-choice",
          required: true,
          options: [
            { value: "Artificer", label: "Artificer (Developer)", description: "I write code, build applications, and work with technical systems" },
            { value: "Bard", label: "Bard (Designer)", description: "I create visual designs, user interfaces, and brand assets" },
            { value: "Paladin", label: "Paladin (Project Manager)", description: "I manage projects, coordinate teams, and ensure deliverables are met" },
            { value: "Storyteller", label: "Storyteller (Content Creator & PR)", description: "I write content, manage communications, and handle public relations" },
            { value: "Rogue", label: "Rogue (Sales & Business Development)", description: "I work with clients, manage sales, and develop business opportunities" },
          ],
        },
      ],
    });
  }
}
