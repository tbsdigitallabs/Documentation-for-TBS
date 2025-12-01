import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { validateProfileData } from "@/lib/validation";
import { calculateLevel } from "@/lib/levelling";
import { getUserByEmail, upsertUser } from "@/lib/user-store";
import type { CosmeticLoadout } from "@/lib/levelling";

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
        cosmeticLoadout?: CosmeticLoadout | null;
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

        // CRITICAL: Fetch FULL completedModules list from user store for accurate XP calculation
        // Session only has 10 most recent modules (to prevent 431 errors), but we need all for XP
        let completedModules = profile.completedModules || [];
        
        // Check user store for full list
        if (user.email) {
            try {
                const storedUser = getUserByEmail(user.email);
                if (storedUser?.completedModules && storedUser.completedModules.length > completedModules.length) {
                    // Use full list from user store for accurate XP calculation
                    completedModules = storedUser.completedModules;
                }
            } catch (error) {
                console.warn('Could not fetch full completedModules from user store:', error);
                // Fall back to session modules if user store fetch fails
            }
        }
        
        // Calculate XP from FULL completed modules list to ensure accuracy
        let calculatedXP = completedModules.reduce((sum: number, module: CompletedModule) => sum + module.xpEarned, 0);
        
        // Override for dev user if needed (if we manually set XP in JWT but have no modules)
        // This allows the dev user hack in authOptions to persist
        const isDevUser = user.email === 'dev@tbsdigitallabs.com.au' || user.email === 'david@thebigsmoke.com.au';
        if (isDevUser) {
            // For dev users, use stored XP if it's higher (handles David's 10000 XP case)
            const storedXP = profile.xp || 0;
            if (storedXP > calculatedXP) {
                calculatedXP = storedXP;
            }
        }
        
        // Always use calculated XP from completed modules (ensures data integrity)
        const finalXP = calculatedXP;
        const finalLevel = calculateLevel(finalXP);

        // Fetch profileImage and cosmeticLoadout from user store (not from session/JWT)
        let profileImage = profile.profileImage;
        let cosmeticLoadout = profile.cosmeticLoadout;
        
        if (user.email) {
            try {
                const storedUser = getUserByEmail(user.email);
                if (storedUser?.profileImage) {
                    profileImage = storedUser.profileImage;
                }
                if (storedUser?.cosmeticLoadout) {
                    cosmeticLoadout = storedUser.cosmeticLoadout;
                }
            } catch (error) {
                console.warn('Could not fetch profileImage/cosmeticLoadout from user store:', error);
            }
        }

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            ...profile,
            xp: finalXP,
            level: finalLevel,
            completedModules: completedModules,
            profileImage: profileImage || undefined,
            cosmeticLoadout: cosmeticLoadout || undefined,
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

        // CRITICAL: Fetch existing user data from user store to preserve XP, level, completedModules
        let existingUser = null;
        try {
            existingUser = getUserByEmail(session.user.email);
        } catch (error) {
            console.warn('Could not fetch existing user from store:', error);
        }

        // Calculate XP and level from completed modules (preserve existing if no modules)
        let finalXP = existingUser?.xp || user.profile?.xp || 0;
        let finalLevel = existingUser?.level || user.profile?.level || 1;
        
        if (existingUser?.completedModules && existingUser.completedModules.length > 0) {
            finalXP = existingUser.completedModules.reduce((sum: number, m: CompletedModule) => sum + m.xpEarned, 0);
            finalLevel = calculateLevel(finalXP);
        }

        // CRITICAL: Use profileImage from request data directly (not from validatedProfile which might be null)
        // The validation function returns null for empty strings, but we want to preserve the actual imageUrl
        const profileImageToSave = data.profileImage || validatedProfile.profileImage || existingUser?.profileImage || user.profile?.profileImage;
        const cosmeticLoadoutToSave = data.cosmeticLoadout || validatedProfile.cosmeticLoadout || existingUser?.cosmeticLoadout || user.profile?.cosmeticLoadout;

        console.log('[Profile PUT] Saving profileImage:', profileImageToSave);
        console.log('[Profile PUT] Request data.profileImage:', data.profileImage);
        console.log('[Profile PUT] Validated profileImage:', validatedProfile.profileImage);

        // Save profile data to user store (including profileImage and cosmeticLoadout)
        upsertUser({
            email: session.user.email,
            name: user.name || session.user.name || 'Anonymous',
            selectedClass: validatedProfile.selectedClass || existingUser?.selectedClass || user.profile?.selectedClass,
            level: finalLevel,
            xp: finalXP,
            image: user.image,
            profileImage: profileImageToSave,
            cosmeticLoadout: cosmeticLoadoutToSave,
            completedModules: existingUser?.completedModules || user.profile?.completedModules || [],
        } as any);

        // Update session with new profile data (but keep it minimal to prevent 431 errors)
        // Note: profileImage and cosmeticLoadout are NOT stored in JWT, only in user store
        const sessionUpdate = {
            profile: {
                ...validatedProfile,
                level: finalLevel,
                xp: finalXP,
                // DO NOT include profileImage or cosmeticLoadout in session update
                // They are stored in user store and fetched via GET /api/profile
            }
        };

        // Verify the saved data by fetching from user store
        const savedUser = getUserByEmail(session.user.email);
        console.log('[Profile PUT] Saved user profileImage:', savedUser?.profileImage);

        // Return updated profile data (including profileImage from user store)
        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            ...validatedProfile,
            level: finalLevel,
            xp: finalXP,
            profileImage: savedUser?.profileImage || profileImageToSave,
            cosmeticLoadout: savedUser?.cosmeticLoadout || cosmeticLoadoutToSave,
            completedModules: existingUser?.completedModules || user.profile?.completedModules || [],
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}

