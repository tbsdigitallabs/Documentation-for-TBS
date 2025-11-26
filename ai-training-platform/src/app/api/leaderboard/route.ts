import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/user-store";

export async function GET() {
  try {
    const users = getLeaderboard();
    
    return NextResponse.json({
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        selectedClass: user.selectedClass,
        level: user.level,
        xp: user.xp,
        image: user.image,
      })),
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ users: [] });
  }
}
