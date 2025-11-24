import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const profile = (session.user as any).profile || {
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
        };

        return NextResponse.json({
            id: (session.user as any).id,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            ...profile,
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

        // Update session via NextAuth's update method
        // This will trigger the JWT callback with trigger: 'update'
        const updatedProfile = {
            bio: data.bio || null,
            role: data.role || null,
            skills: data.skills || [],
            interests: data.interests || [],
            learningGoals: data.learningGoals || null,
            experienceLevel: data.experienceLevel || null,
            profileImage: data.profileImage || null,
        };

        // Note: In a real implementation, you'd call session.update() from the client
        // For server-side, we return the updated profile and the client should update the session
        return NextResponse.json({
            id: (session.user as any).id,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            ...updatedProfile,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}

