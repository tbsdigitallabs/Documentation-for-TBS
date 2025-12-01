import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/user-store";

export async function GET() {
  try {
    const users = await getLeaderboard();
    
    return NextResponse.json({
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        selectedClass: user.selectedClass,
        level: user.level,
        xp: user.xp,
        image: user.image,
        profileImage: user.profileImage,
        cosmeticLoadout: user.cosmeticLoadout,
      })),
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ users: [] });
  }
}
