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
    console.log('[Profile API] GET request received');
    const startTime = Date.now();
    
    try {
        console.log('[Profile API] Fetching session...');
        const sessionStartTime = Date.now();
        const session = await getServerSession(authOptions);
        const sessionTime = Date.now() - sessionStartTime;
        console.log('[Profile API] Session fetched', { 
            hasSession: !!session, 
            hasUser: !!session?.user, 
            email: session?.user?.email,
            time: `${sessionTime}ms`
        });
        
        if (!session?.user?.email) {
            console.warn('[Profile API] Unauthorized - no session or email');
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

        // CRITICAL: Fetch user data from user store once (optimize file reads)
        // Session only has 10 most recent modules (to prevent 431 errors), but we need all for XP
        let completedModules = profile.completedModules || [];
        let profileImage = profile.profileImage;
        let cosmeticLoadout = profile.cosmeticLoadout;
        
        console.log('[Profile API] Initial profile data', {
            completedModulesCount: completedModules.length,
            hasProfileImage: !!profileImage,
            hasCosmeticLoadout: !!cosmeticLoadout
        });
        
        // Fetch from user store once
        if (user.email) {
            try {
                console.log('[Profile API] Fetching user from store...', { email: user.email });
                const storeStartTime = Date.now();
                const storedUser = await getUserByEmail(user.email);
                const storeTime = Date.now() - storeStartTime;
                console.log('[Profile API] User store fetch completed', { 
                    found: !!storedUser,
                    time: `${storeTime}ms`,
                    hasCompletedModules: !!storedUser?.completedModules,
                    completedModulesCount: storedUser?.completedModules?.length || 0
                });
                
                if (storedUser) {
                    // Use full completedModules list from user store for accurate XP calculation
                    if (storedUser.completedModules && storedUser.completedModules.length > completedModules.length) {
                        console.log('[Profile API] Using full completedModules from store', {
                            oldCount: completedModules.length,
                            newCount: storedUser.completedModules.length
                        });
                        completedModules = storedUser.completedModules;
                    }
                    // Fetch profileImage and cosmeticLoadout from user store (not from session/JWT)
                    if (storedUser.profileImage) {
                        profileImage = storedUser.profileImage;
                        console.log('[Profile API] Using profileImage from store');
                    }
                    if (storedUser.cosmeticLoadout) {
                        cosmeticLoadout = storedUser.cosmeticLoadout;
                        console.log('[Profile API] Using cosmeticLoadout from store');
                    }
                }
            } catch (error) {
                console.warn('[Profile API] Could not fetch user data from user store:', error);
                // Fall back to session data if user store fetch fails
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

        const totalTime = Date.now() - startTime;
        console.log('[Profile API] Preparing response');
        console.log('[Profile API] finalXP:', finalXP);
        console.log('[Profile API] finalLevel:', finalLevel);
        console.log('[Profile API] completedModulesCount:', completedModules.length);
        console.log('[Profile API] profileImage value:', profileImage);
        console.log('[Profile API] profileImage type:', typeof profileImage);
        console.log('[Profile API] profileImage truthy:', !!profileImage);
        console.log('[Profile API] hasCosmeticLoadout:', !!cosmeticLoadout);
        console.log('[Profile API] totalTime:', `${totalTime}ms`);
        
        // Don't spread profile.profileImage or profile.cosmeticLoadout as they might be null/undefined
        // Set them explicitly from the user store values
        const { profileImage: _, cosmeticLoadout: __, ...profileWithoutImages } = profile;
        const responseData = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            ...profileWithoutImages,
            xp: finalXP,
            level: finalLevel,
            completedModules: completedModules,
            profileImage: profileImage || undefined,
            cosmeticLoadout: cosmeticLoadout || undefined,
        };
        
        console.log('[Profile API] Response data profileImage:', responseData.profileImage);
        console.log('[Profile API] Response data profileImage type:', typeof responseData.profileImage);
        
        const response = NextResponse.json(responseData);
        
        console.log('[Profile API] Response sent successfully');
        return response;
    } catch (error) {
        const totalTime = Date.now() - startTime;
        console.error("[Profile API] Error fetching profile:", error);
        console.error("[Profile API] Error details:", {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            totalTime: `${totalTime}ms`
        });
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
            existingUser = await getUserByEmail(session.user.email);
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

        console.log('[Profile PUT] Saving profileImage');
        console.log('[Profile PUT] Request data.profileImage:', data.profileImage);
        console.log('[Profile PUT] Request data.profileImage type:', typeof data.profileImage);
        console.log('[Profile PUT] Request data.profileImage truthy:', !!data.profileImage);
        console.log('[Profile PUT] Validated profileImage:', validatedProfile.profileImage);
        console.log('[Profile PUT] Existing user profileImage:', existingUser?.profileImage);
        console.log('[Profile PUT] User profile profileImage:', user.profile?.profileImage);
        console.log('[Profile PUT] Final profileImageToSave:', profileImageToSave);
        console.log('[Profile PUT] Final profileImageToSave type:', typeof profileImageToSave);
        console.log('[Profile PUT] Final profileImageToSave truthy:', !!profileImageToSave);

        // Save profile data to user store (including profileImage and cosmeticLoadout)
        await upsertUser({
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
        const savedUser = await getUserByEmail(session.user.email);
        console.log('[Profile PUT] Saved user profileImage:', savedUser?.profileImage);

        // Return updated profile data (including profileImage from user store)
        // IMPORTANT: Don't spread validatedProfile.profileImage as it might be undefined/null
        // Use the saved profileImage instead
        const { profileImage: _, cosmeticLoadout: __, ...validatedProfileWithoutImages } = validatedProfile;
        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            ...validatedProfileWithoutImages,
            level: finalLevel,
            xp: finalXP,
            profileImage: savedUser?.profileImage || profileImageToSave || undefined,
            cosmeticLoadout: savedUser?.cosmeticLoadout || cosmeticLoadoutToSave || undefined,
            completedModules: existingUser?.completedModules || user.profile?.completedModules || [],
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        console.error("Error details:", {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });
        return NextResponse.json({ 
            error: "Failed to update profile",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

