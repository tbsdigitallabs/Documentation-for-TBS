import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { validateProfileData } from "@/lib/validation";
import { calculateLevel } from "@/lib/levelling";

interface CompletedModule {
    moduleId: string;
    moduleName: string;
    completedAt: string;
    xpEarned: number;
    quizScore?: number;
}

interface SessionUser {
    id?: string;
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
        level?: number;
        xp?: number;
        completedModules?: CompletedModule[];
    };
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = session.user as SessionUser;
        const profile = user.profile || {
            bio: null,
            role: null,
            skills: [],
            interests: [],
            learningGoals: null,
            experienceLevel: null,
            profileImage: null,
            selectedClass: null,
            level: 1,
            xp: 0,
            completedModules: [],
        };

        // Calculate XP from completed modules to ensure consistency
        const completedModules = profile.completedModules || [];
        let calculatedXP = completedModules.reduce((sum: number, module: CompletedModule) => sum + module.xpEarned, 0);
        
        // Override for dev user if needed (if we manually set XP in JWT but have no modules)
        // This allows the dev user hack in authOptions to persist
        const isDevUser = user.email === 'dev@tbsdigitallabs.com.au' || user.email === 'david@thebigsmoke.com.au';
        if (isDevUser && process.env.NODE_ENV === 'development') {
            // If the JWT says we have 10000 XP, respect it even if modules don't sum up
            // Or better yet, just force it here too for consistency
            calculatedXP = 10000;
        }
        
        // Always use calculated XP from completed modules (ensures data integrity)
        const finalXP = calculatedXP;
        const finalLevel = calculateLevel(finalXP);

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            ...profile,
            xp: finalXP,
            level: finalLevel,
            completedModules: completedModules,
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();

        // Validate and sanitize profile data
        const validatedProfile = validateProfileData(data);

        const user = session.user as SessionUser;

        // Return validated profile data
        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            ...validatedProfile,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}

