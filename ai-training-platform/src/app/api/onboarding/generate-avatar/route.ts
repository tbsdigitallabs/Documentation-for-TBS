import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { seed } = await req.json();
    const avatarSeed = seed || session.user.email || Math.random().toString(36).substring(2, 15);

    // Use DiceBear API to generate avatar (avataaars style) as PNG for better quality
    // Size 256x256 for high resolution
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(avatarSeed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&size=256`;

    // Fetch the PNG from DiceBear
    const response = await fetch(avatarUrl);
    if (!response.ok) {
      // Fallback to identicon if avataaars fails
      const fallbackUrl = `https://api.dicebear.com/7.x/identicon/png?seed=${encodeURIComponent(avatarSeed)}&size=256`;
      const fallbackResponse = await fetch(fallbackUrl);
      if (!fallbackResponse.ok) {
        return NextResponse.json({ error: "Failed to generate avatar" }, { status: 500 });
      }
      const fallbackBlob = await fallbackResponse.blob();
      const fallbackArrayBuffer = await fallbackBlob.arrayBuffer();
      return NextResponse.json({
        imageData: Buffer.from(fallbackArrayBuffer).toString('base64'),
        mimeType: 'image/png',
      });
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    
    // Return base64 encoded image data
    return NextResponse.json({
      imageData: Buffer.from(arrayBuffer).toString('base64'),
      mimeType: 'image/png',
    });
  } catch (error) {
    console.error("Error generating avatar:", error);
    return NextResponse.json({ error: "Failed to generate avatar" }, { status: 500 });
  }
}

