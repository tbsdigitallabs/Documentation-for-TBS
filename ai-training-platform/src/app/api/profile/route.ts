import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                profileImage: true,
                bio: true,
                role: true,
                skills: true,
                interests: true,
                learningGoals: true,
                experienceLevel: true,
                selectedClass: true,
                level: true,
                xp: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            ...user,
            skills: user.skills ? JSON.parse(user.skills) : [],
            interests: user.interests ? JSON.parse(user.interests) : [],
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();

        const updated = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                bio: data.bio || null,
                role: data.role || null,
                skills: data.skills ? JSON.stringify(data.skills) : null,
                interests: data.interests ? JSON.stringify(data.interests) : null,
                learningGoals: data.learningGoals || null,
                experienceLevel: data.experienceLevel || null,
                profileImage: data.profileImage || null,
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                profileImage: true,
                bio: true,
                role: true,
                skills: true,
                interests: true,
                learningGoals: true,
                experienceLevel: true,
                selectedClass: true,
                level: true,
                xp: true,
            },
        });

        return NextResponse.json({
            ...updated,
            skills: updated.skills ? JSON.parse(updated.skills) : [],
            interests: updated.interests ? JSON.parse(updated.interests) : [],
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}

