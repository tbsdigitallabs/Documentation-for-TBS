import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUserByEmail } from "@/lib/user-store";

/**
 * API endpoint to fetch full completedModules list from user store
 * This prevents storing all modules in JWT token (which causes 431 errors)
 */
export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch full completedModules list from user store
    const storedUser = getUserByEmail(session.user.email);
    const completedModules = storedUser?.completedModules || [];

    return NextResponse.json({
      completedModules,
      totalCount: completedModules.length,
    });
  } catch (error) {
    console.error("Error fetching completed modules:", error);
    return NextResponse.json(
      { error: "Failed to fetch completed modules" },
      { status: 500 }
    );
  }
}
