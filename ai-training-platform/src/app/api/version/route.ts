import { NextResponse } from "next/server";
import { getAppVersion } from "@/lib/version";

// Force dynamic rendering to ensure K_REVISION is read at runtime
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const version = getAppVersion();
  
  // Prevent caching - version should always be fresh
  return NextResponse.json(
    { version },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    }
  );
}

