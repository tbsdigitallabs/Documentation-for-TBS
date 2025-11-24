import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Free LLM API for processing answers
const LLM_API_URL = process.env.LLM_API_URL || "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
const LLM_API_KEY = process.env.LLM_API_KEY || "";

const EXTRACTION_PROMPT = `Extract profile information from this conversation:

Question: {question}
Answer: {answer}

Current profile data: {currentData}

Extract and update the profile information. Return a JSON object with these fields (only include fields that can be determined from the answer):
- role: job title/role
- experienceLevel: "Beginner", "Intermediate", or "Advanced"
- skills: array of skills mentioned
- interests: array of interests mentioned
- learningGoals: what they want to learn
- bio: a brief bio based on the information

Return ONLY valid JSON, no other text.`;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { question, answer, currentData, questionIndex } = await req.json();

    let updatedProfile = { ...currentData };

    // Simple extraction without LLM (fallback)
    const lowerAnswer = answer.toLowerCase();

    // Extract role
    if (!updatedProfile.role) {
      const roleMatches = answer.match(/(?:i am|i'm|i work as|my role is|i'm a|i am a)\s+([^,.!?]+)/i);
      if (roleMatches) {
        updatedProfile.role = roleMatches[1].trim();
      }
    }

    // Extract experience level
    if (!updatedProfile.experienceLevel) {
      if (lowerAnswer.includes("beginner") || lowerAnswer.includes("new") || lowerAnswer.includes("just starting")) {
        updatedProfile.experienceLevel = "Beginner";
      } else if (lowerAnswer.includes("advanced") || lowerAnswer.includes("expert") || lowerAnswer.includes("proficient")) {
        updatedProfile.experienceLevel = "Advanced";
      } else if (lowerAnswer.includes("intermediate") || lowerAnswer.includes("some") || lowerAnswer.includes("moderate")) {
        updatedProfile.experienceLevel = "Intermediate";
      }
    }

    // Extract skills (simple keyword matching)
    if (!updatedProfile.skills) {
      updatedProfile.skills = [];
    }
    const skillKeywords = ["javascript", "python", "design", "marketing", "sales", "project management", "content", "writing"];
    skillKeywords.forEach(skill => {
      if (lowerAnswer.includes(skill) && !updatedProfile.skills?.includes(skill)) {
        updatedProfile.skills.push(skill);
      }
    });

    // Extract learning goals
    if (!updatedProfile.learningGoals) {
      if (lowerAnswer.includes("learn") || lowerAnswer.includes("want to") || lowerAnswer.includes("interested in")) {
        updatedProfile.learningGoals = answer.substring(0, 200);
      }
    }

    // Try LLM extraction if API key is available
    if (LLM_API_KEY && LLM_API_URL.includes("huggingface")) {
      try {
        const prompt = EXTRACTION_PROMPT
          .replace("{question}", question)
          .replace("{answer}", answer)
          .replace("{currentData}", JSON.stringify(currentData));

        const response = await fetch(LLM_API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${LLM_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 300,
              return_full_text: false,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const generatedText = Array.isArray(data) ? data[0]?.generated_text || "" : data.generated_text || "";
          
          // Try to parse JSON from response
          const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              const extracted = JSON.parse(jsonMatch[0]);
              updatedProfile = { ...updatedProfile, ...extracted };
            } catch (e) {
              // Use simple extraction if JSON parse fails
            }
          }
        }
      } catch (error) {
        // Fall back to simple extraction
        console.error("LLM extraction failed, using simple extraction:", error);
      }
    }

    return NextResponse.json({ updatedProfile });
  } catch (error) {
    console.error("Error processing answer:", error);
    return NextResponse.json({ error: "Failed to process answer" }, { status: 500 });
  }
}

