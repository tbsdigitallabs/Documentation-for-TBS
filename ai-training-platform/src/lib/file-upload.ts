import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { uploadImageToGCS } from "./gcs-storage";
import sharp from "sharp";

// Allowed image MIME types
const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml", // Allow SVG for generated avatars
];

// Allowed file extensions
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "svg"];

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export interface UploadResult {
    success: boolean;
    imageUrl?: string;
    error?: string;
}

/**
 * Validates and uploads an image file
 * Uses Cloud Storage in production, local filesystem in development
 */
export async function uploadImage(
    file: File,
    userEmail: string,
    subdirectory: string = "profiles"
): Promise<UploadResult> {
    try {
        // Validate file exists
        if (!file) {
            return { success: false, error: "No image provided" };
        }

        // Validate file type by MIME type
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return { success: false, error: "File must be a valid image (JPEG, PNG, GIF, WebP, or SVG)" };
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return { success: false, error: "Image must be less than 5MB" };
        }

        // Validate file extension
        const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
        if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
            return { success: false, error: "Invalid file extension. Only JPEG, PNG, GIF, WebP, and SVG are allowed" };
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        let buffer = Buffer.from(bytes);

        // Optimize image before upload (skip SVG as it's vector)
        let wasOptimized = false;
        if (file.type !== 'image/svg+xml' && file.type.startsWith('image/')) {
            try {
                const originalSize = buffer.length;
                const sharpInstance = sharp(buffer);

                // Get image metadata to determine if resizing is needed
                const metadata = await sharpInstance.metadata();
                const maxDimension = 1920; // Max width/height for profile images

                // Resize if image is too large
                if (metadata.width && metadata.height && (metadata.width > maxDimension || metadata.height > maxDimension)) {
                    const optimizedBuffer = await sharpInstance
                        .resize(maxDimension, maxDimension, {
                            fit: 'inside',
                            withoutEnlargement: true,
                        })
                        .webp({ quality: 85, effort: 4 }) // Convert to WebP for better compression
                        .toBuffer();

                    buffer = Buffer.from(optimizedBuffer);
                    wasOptimized = true;
                } else {
                    // Just convert to WebP for better compression without resizing
                    const optimizedBuffer = await sharpInstance
                        .webp({ quality: 85, effort: 4 })
                        .toBuffer();

                    buffer = Buffer.from(optimizedBuffer);
                    wasOptimized = true;
                }
            } catch (optimizationError) {
                console.warn('[File Upload] Image optimization failed, using original', {
                    error: optimizationError instanceof Error ? optimizationError.message : String(optimizationError),
                });
                // Continue with original buffer if optimization fails
            }
        }

        // Use Cloud Storage in production, local filesystem in development
        const useCloudStorage = process.env.NODE_ENV === 'production' || process.env.USE_CLOUD_STORAGE === 'true';

        if (useCloudStorage) {
            // Determine final extension and MIME type based on optimization
            const finalExtension = wasOptimized ? 'webp' : fileExtension;
            const finalMimeType = wasOptimized ? 'image/webp' : file.type;

            // Create a new File object with optimized buffer for GCS upload
            const optimizedFile = new File([buffer], file.name.replace(/\.[^.]+$/, `.${finalExtension}`), {
                type: finalMimeType,
            });
            return await uploadImageToGCS(optimizedFile, userEmail, subdirectory);
        }

        // Local filesystem fallback for development
        // NOTE: public/uploads/ is only used in development - production uses Cloud Storage
        const sanitizedEmail = userEmail.replace(/[^a-zA-Z0-9@._-]/g, "_").substring(0, 100);

        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), "public", "uploads", subdirectory);
        await mkdir(uploadsDir, { recursive: true });

        // Generate unique filename with timestamp and sanitized email
        // Use .webp extension if image was optimized
        const finalExtension = wasOptimized ? 'webp' : fileExtension;
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const filename = `${sanitizedEmail}_${timestamp}_${randomSuffix}.${finalExtension}`;

        // Use join to prevent path traversal attacks
        const filepath = join(uploadsDir, filename);

        // Ensure the resolved path is within the uploads directory
        const resolvedPath = join(process.cwd(), "public", "uploads", subdirectory, filename);
        if (!filepath.startsWith(join(process.cwd(), "public", "uploads"))) {
            return { success: false, error: "Invalid file path" };
        }

        // Save optimized buffer
        await writeFile(resolvedPath, buffer);

        // Return the public URL
        const imageUrl = `/uploads/${subdirectory}/${filename}`;

        return { success: true, imageUrl };
    } catch (error) {
        console.error("Error uploading image:", error);
        return { success: false, error: "Failed to upload image" };
    }
}

