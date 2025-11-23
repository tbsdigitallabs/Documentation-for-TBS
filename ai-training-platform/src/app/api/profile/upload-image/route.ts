import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        if (!file.type.startsWith("image/")) {
            return NextResponse.json({ error: "File must be an image" }, { status: 400 });
        }

        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "Image must be less than 5MB" }, { status: 400 });
        }

        const uploadsDir = join(process.cwd(), "public", "uploads", "profiles");
        await mkdir(uploadsDir, { recursive: true });

        const timestamp = Date.now();
        const sanitizedEmail = session.user.email.replace(/[^a-zA-Z0-9]/g, "_");
        const fileExtension = file.name.split(".").pop() || "jpg";
        const filename = `${sanitizedEmail}_${timestamp}.${fileExtension}`;
        const filepath = join(uploadsDir, filename);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        const imageUrl = `/uploads/profiles/${filename}`;

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}

