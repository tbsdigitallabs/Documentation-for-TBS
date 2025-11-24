import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// Free LLM API - Using Hugging Face Inference API (free tier)
// Alternative: OpenAI (has free tier), Anthropic, or Cohere
const LLM_API_URL = process.env.LLM_API_URL || "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
const LLM_API_KEY = process.env.LLM_API_KEY || "";

const MASTER_PROMPT = `You are a wise character creation guide in a fantasy realm. You're helping a new adventurer create their profile for an AI training academy.

The adventurer's name is {name} and their contact is {email}.

You should ask questions in a fantasy/D&D style to gather:
1. Their class/role (like "Artificer" for developers, "Bard" for designers, etc.)
2. Their experience level (Novice, Apprentice, or Master)
3. Their current skills and abilities
4. What knowledge they seek to gain
5. Their interests and passions

Ask ONE question at a time. Be friendly and use fantasy-themed language. Make it feel like character creation in a game. Start with the first question.

Return ONLY the question text, nothing else.`;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, name } = await req.json();

    // Generate questions using LLM
    const prompt = MASTER_PROMPT.replace("{name}", name || "there").replace("{email}", email || "");

    let questions: string[] = [];

    if (LLM_API_KEY && LLM_API_URL.includes("huggingface")) {
      // Hugging Face API
      const response = await fetch(LLM_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${LLM_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            return_full_text: false,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const generatedText = Array.isArray(data) ? data[0]?.generated_text || "" : data.generated_text || "";

        // Extract questions (fallback to default if LLM fails)
        questions = extractQuestions(generatedText);
      }
    }

    // Fallback to default questions if LLM fails or not configured (with fantasy theme)
    if (questions.length === 0) {
      questions = [
        "What class do you identify with in your quest? (Artificer, Bard, Paladin, Storyteller, Rogue, or another path?)",
        "How would you describe your experience level with AI magic? (Novice, Apprentice, or Master)",
        "What skills and abilities do you already possess that you'd like to enhance with AI?",
        "What knowledge are you most eager to gain on your journey?",
        "What passions and interests drive you outside of your main quest?",
      ];
    }

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    // Return default questions on error
    return NextResponse.json({
      questions: [
        "What's your current job role or title?",
        "How would you describe your experience level with AI tools?",
        "What skills do you already have?",
        "What are you most excited to learn about AI?",
        "What are your main interests?",
      ],
    });
  }
}

function extractQuestions(text: string): string[] {
  // Simple extraction - look for question marks
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const questions = sentences
    .filter(s => s.includes("?") || s.toLowerCase().includes("what") || s.toLowerCase().includes("how"))
    .map(s => s.trim().replace(/^["']|["']$/g, ""))
    .slice(0, 5);

  return questions.length > 0 ? questions : [];
}

