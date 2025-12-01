import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Storage } from "@google-cloud/storage";
import sharp from "sharp";

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

    console.log('[Image API] Request received', {
      pathArray: resolvedParams.path,
      filepath,
      filepathLength: filepath.length,
      hasDotDot: filepath.includes('..'),
      startsWithSlash: filepath.startsWith('/'),
    });

    // Validate filepath (prevent path traversal)
    if (!filepath || filepath.includes('..') || filepath.startsWith('/')) {
      console.error('[Image API] Invalid file path', {
        filepath,
        isEmpty: !filepath,
        hasDotDot: filepath.includes('..'),
        startsWithSlash: filepath.startsWith('/'),
      });
      return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
    }

    // Get file from Cloud Storage
    const storageInstance = getStorageInstance();
    const bucket = storageInstance.bucket(BUCKET_NAME);
    const file = bucket.file(filepath);

    // Check if file exists
    const [exists] = await file.exists();
    console.log('[Image API] File check', {
      filepath,
      exists,
      bucket: BUCKET_NAME,
    });
    if (!exists) {
      console.error('[Image API] File not found', { filepath, bucket: BUCKET_NAME });
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Get file metadata to determine content type
    const [metadata] = await file.getMetadata();
    const originalContentType = metadata.contentType || 'image/jpeg';

    // Download file as buffer
    const [buffer] = await file.download();

    // Parse query parameters for optimization
    const { searchParams } = new URL(req.url);
    const width = searchParams.get('w') ? parseInt(searchParams.get('w')!, 10) : null;
    const height = searchParams.get('h') ? parseInt(searchParams.get('h')!, 10) : null;
    const quality = searchParams.get('q') ? parseInt(searchParams.get('q')!, 10) : 85;
    const format = searchParams.get('f') || 'webp'; // Default to WebP for better compression

    // Check if image optimization is requested
    const shouldOptimize = width || height || format !== 'original';

    let optimizedBuffer: Buffer;
    let finalContentType: string;

    if (shouldOptimize && originalContentType.startsWith('image/')) {
      try {
        // Create sharp instance from buffer
        let sharpInstance = sharp(buffer);

        // Resize if dimensions specified
        if (width || height) {
          sharpInstance = sharpInstance.resize(width || undefined, height || undefined, {
            fit: 'inside', // Maintain aspect ratio
            withoutEnlargement: true, // Don't upscale small images
          });
        }

        // Convert format and optimize
        switch (format) {
          case 'webp':
            optimizedBuffer = await sharpInstance
              .webp({ quality, effort: 4 }) // effort 4 = good balance of speed/compression
              .toBuffer();
            finalContentType = 'image/webp';
            break;
          case 'avif':
            optimizedBuffer = await sharpInstance
              .avif({ quality, effort: 4 })
              .toBuffer();
            finalContentType = 'image/avif';
            break;
          case 'jpeg':
          case 'jpg':
            optimizedBuffer = await sharpInstance
              .jpeg({ quality, mozjpeg: true })
              .toBuffer();
            finalContentType = 'image/jpeg';
            break;
          case 'png':
            optimizedBuffer = await sharpInstance
              .png({ quality, compressionLevel: 9 })
              .toBuffer();
            finalContentType = 'image/png';
            break;
          default:
            // If format not supported, just resize if needed
            if (width || height) {
              optimizedBuffer = await sharpInstance.toBuffer();
            } else {
              optimizedBuffer = buffer;
            }
            finalContentType = originalContentType;
        }

        console.log('[Image API] Image optimized', {
          filepath,
          originalSize: buffer.length,
          optimizedSize: optimizedBuffer.length,
          reduction: `${((1 - optimizedBuffer.length / buffer.length) * 100).toFixed(1)}%`,
          format,
          dimensions: width || height ? `${width || 'auto'}x${height || 'auto'}` : 'original',
        });
      } catch (optimizationError) {
        console.warn('[Image API] Optimization failed, serving original', {
          error: optimizationError instanceof Error ? optimizationError.message : String(optimizationError),
          filepath,
        });
        // Fallback to original if optimization fails
        optimizedBuffer = buffer;
        finalContentType = originalContentType;
      }
    } else {
      // No optimization requested, serve original
      optimizedBuffer = buffer;
      finalContentType = originalContentType;
    }

    // Return optimized image with proper content type
    return new NextResponse(optimizedBuffer, {
      headers: {
        'Content-Type': finalContentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
        'X-Image-Optimized': shouldOptimize ? 'true' : 'false',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { 
        error: "Failed to serve image",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

