import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Storage } from "@google-cloud/storage";

// Initialize Cloud Storage (uses ADC)
let storage: Storage | null = null;

function getStorageInstance(): Storage {
  if (storage) {
    return storage;
  }
  storage = new Storage();
  return storage;
}

const BUCKET_NAME = process.env.GCS_BUCKET_NAME || 'learninglab-storage';

/**
 * Serves images from Cloud Storage through an authenticated API route
 * Images remain private in Cloud Storage, but authenticated users can access them
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get file path from URL segments
    const resolvedParams = await params;
    const filepath = resolvedParams.path.join('/');

    // Validate filepath (prevent path traversal)
    if (!filepath || filepath.includes('..') || filepath.startsWith('/')) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
    }

    // Get file from Cloud Storage
    const storageInstance = getStorageInstance();
    const bucket = storageInstance.bucket(BUCKET_NAME);
    const file = bucket.file(filepath);

    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Get file metadata to determine content type
    const [metadata] = await file.getMetadata();
    const contentType = metadata.contentType || 'image/jpeg';

    // Download file as buffer
    const [buffer] = await file.download();

    // Return image with proper content type
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return NextResponse.json(
      { error: "Failed to serve image" },
      { status: 500 }
    );
  }
}

