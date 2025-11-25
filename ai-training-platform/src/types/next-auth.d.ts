import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      profile?: {
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
        level?: number;
        xp?: number;
      };
      onboardingCompleted?: boolean;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    email?: string | null;
    name?: string | null;
    picture?: string | null;
    onboardingCompleted?: boolean;
    profile?: {
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
      level?: number;
      xp?: number;
    };
  }
}

