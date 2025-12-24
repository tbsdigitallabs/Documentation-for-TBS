import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getAllUsers } from "@/lib/user-store";
import { getFirestore } from "firebase-admin/firestore";
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        // In development, allow bypass with API key or session
        const isDevelopment = process.env.NODE_ENV === 'development';
        const apiKey = req.headers.get('x-api-key');
        const bypassKey = process.env.FLUSH_USERS_API_KEY || 'dev-bypass-key';

        let session = null;
        let keepEmail = 'david@thebigsmoke.com.au'; // Default

        // Check API key first (for development/testing)
        if (isDevelopment && apiKey === bypassKey) {
            // Allow bypass in development with API key
            console.log('[Flush Users] Development bypass with API key');
        } else {
            // Otherwise require session
            session = await getServerSession(authOptions);

            if (!session?.user?.email) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            // Only allow dev accounts to flush users
            const allowedEmails = [
                'david@thebigsmoke.com.au',
                'dev@tbsdigitallabs.com.au'
            ];

            if (!allowedEmails.includes(session.user.email?.toLowerCase() || '')) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }

            keepEmail = session.user.email;
        }

        const body = await req.json();
        keepEmail = body.keepEmail || keepEmail || 'david@thebigsmoke.com.au';

        console.log(`[Flush Users] Starting flush - deleting all users, then creating ${keepEmail}`);

        const allUsers = await getAllUsers();
        console.log(`[Flush Users] Found ${allUsers.length} users to delete`);

        // Check if using Firestore
        const useFirestore = process.env.NODE_ENV === 'production' || process.env.USE_FIRESTORE === 'true';

        // Delete ALL users
        if (useFirestore) {
            const db = getFirestore();
            const BATCH_SIZE = 500;

            for (let i = 0; i < allUsers.length; i += BATCH_SIZE) {
                const batch = db.batch();
                const chunk = allUsers.slice(i, i + BATCH_SIZE);

                for (const user of chunk) {
                    const userRef = db.collection('users').doc(user.email);
                    batch.delete(userRef);
                }

                await batch.commit();
                console.log(`[Flush Users] Deleted batch ${Math.floor(i / BATCH_SIZE) + 1} (${chunk.length} users)`);
            }
        } else {
            // Local filesystem - just write empty array
            const DATA_DIR = path.join(process.cwd(), 'data');
            const USERS_FILE = path.join(DATA_DIR, 'users.json');

            if (!fs.existsSync(DATA_DIR)) {
                fs.mkdirSync(DATA_DIR, { recursive: true });
            }

            fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
        }

        // Now create the new admin user
        const { upsertUser } = await import('@/lib/user-store');
        const newAdminUser = await upsertUser({
            email: keepEmail,
            name: 'David',
            level: 1,
            xp: 0,
            accessDenied: false,
        });

        console.log(`[Flush Users] Created admin user: ${keepEmail}`);

        return NextResponse.json({
            success: true,
            message: `Deleted all ${allUsers.length} users and created admin user ${keepEmail}`,
            deleted: allUsers.length,
            created: keepEmail,
            user: newAdminUser
        });
    } catch (error) {
        console.error('[Flush Users] Error:', error);
        return NextResponse.json({
            error: "Failed to flush users",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}

