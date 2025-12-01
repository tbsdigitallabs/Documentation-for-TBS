/**
 * Input validation utilities
 */

import type { CosmeticLoadout } from './levelling';

// Maximum lengths for various fields
export const MAX_LENGTHS = {
    bio: 500,
    role: 100,
    learningGoals: 500,
    skill: 50,
    interest: 50,
    name: 200,
    answer: 2000,
} as const;

/**
 * Sanitizes a string by removing potentially dangerous characters
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
    if (typeof input !== "string") {
        return "";
    }

    // Remove null bytes and trim
    let sanitized = input.replace(/\0/g, "").trim();

    // Limit length
    if (sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }

    return sanitized;
}

/**
 * Validates and sanitizes an array of strings
 */
export function sanitizeStringArray(
    input: unknown,
    maxItems: number = 20,
    maxItemLength: number = 100
): string[] {
    if (!Array.isArray(input)) {
        return [];
    }

    return input
        .slice(0, maxItems)
        .map((item) => sanitizeString(String(item), maxItemLength))
        .filter((item) => item.length > 0);
}

/**
 * Validates profile data
 */
export interface ProfileData {
  bio?: string | null;
  role?: string | null;
  skills?: string[];
  interests?: string[];
  learningGoals?: string | null;
  experienceLevel?: string | null;
  profileImage?: string | null;
  selectedClass?: string | null;
  hobbies?: string | null;
  systems?: string | null;
  cosmeticLoadout?: CosmeticLoadout | null;
}

export function validateProfileData(data: unknown): ProfileData {
    if (typeof data !== "object" || data === null) {
        return {};
    }

    const obj = data as Record<string, unknown>;

    return {
        bio: obj.bio ? sanitizeString(String(obj.bio), MAX_LENGTHS.bio) : null,
        role: obj.role ? sanitizeString(String(obj.role), MAX_LENGTHS.role) : null,
        skills: sanitizeStringArray(obj.skills, 20, MAX_LENGTHS.skill),
        interests: sanitizeStringArray(obj.interests, 20, MAX_LENGTHS.interest),
        learningGoals: obj.learningGoals
            ? sanitizeString(String(obj.learningGoals), MAX_LENGTHS.learningGoals)
            : null,
        experienceLevel: obj.experienceLevel
            ? sanitizeString(String(obj.experienceLevel), 50)
            : null,
        profileImage: obj.profileImage && String(obj.profileImage).trim()
            ? sanitizeString(String(obj.profileImage), 500)
            : undefined, // Use undefined instead of null to allow fallback
    selectedClass: obj.selectedClass
      ? sanitizeString(String(obj.selectedClass), 100)
      : null,
    hobbies: obj.hobbies
      ? sanitizeString(String(obj.hobbies), MAX_LENGTHS.bio)
      : null,
    systems: obj.systems
      ? sanitizeString(String(obj.systems), MAX_LENGTHS.bio)
      : null,
  };
}

/**
 * Validates onboarding answer
 */
export function validateAnswer(answer: unknown): string {
    if (typeof answer !== "string") {
        return "";
    }
    return sanitizeString(answer, MAX_LENGTHS.answer);
}

