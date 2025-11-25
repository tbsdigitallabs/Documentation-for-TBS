import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

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
            return { success: false, error: "File must be a valid image (JPEG, PNG, GIF, or WebP)" };
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return { success: false, error: "Image must be less than 5MB" };
        }

        // Validate file extension
        const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
        if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
            return { success: false, error: "Invalid file extension. Only JPEG, PNG, GIF, and WebP are allowed" };
        }

        // Sanitize email for filename (prevent path traversal)
        const sanitizedEmail = userEmail.replace(/[^a-zA-Z0-9@._-]/g, "_").substring(0, 100);

        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), "public", "uploads", subdirectory);
        await mkdir(uploadsDir, { recursive: true });

        // Generate unique filename with timestamp and sanitized email
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        const filename = `${sanitizedEmail}_${timestamp}_${randomSuffix}.${fileExtension}`;

        // Use join to prevent path traversal attacks
        const filepath = join(uploadsDir, filename);

        // Ensure the resolved path is within the uploads directory
        const resolvedPath = join(process.cwd(), "public", "uploads", subdirectory, filename);
        if (!filepath.startsWith(join(process.cwd(), "public", "uploads"))) {
            return { success: false, error: "Invalid file path" };
        }

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(resolvedPath, buffer);

        // Return the public URL
        const imageUrl = `/uploads/${subdirectory}/${filename}`;

        return { success: true, imageUrl };
    } catch (error) {
        console.error("Error uploading image:", error);
        return { success: false, error: "Failed to upload image" };
    }
}

