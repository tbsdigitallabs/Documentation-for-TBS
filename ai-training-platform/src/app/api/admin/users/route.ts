import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllUsers } from "@/lib/user-store";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // Hard restricted to specific admin
    if (session.user.email !== 'david@thebigsmoke.com.au') {
        return new NextResponse('Forbidden', { status: 403 });
    }

    try {
        const users = await getAllUsers();

        // Filter fields to return only necessary info
        const filteredUsers = users.map(user => ({
            email: user.email,
            name: user.name,
            firstSeen: user.firstSeen,
            lastSeen: user.lastSeen || user.lastUpdated,
            accessDenied: user.accessDenied,
            deniedReason: user.deniedReason,
        }));

        return NextResponse.json(filteredUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
