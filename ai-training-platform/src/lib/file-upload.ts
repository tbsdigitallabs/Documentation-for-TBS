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

/**
 * Uploads an image from various sources (File, data URL, blob URL, or server URL)
 * Returns the server URL for the uploaded image
 */
export async function uploadImageFromSource(
    source: File | string | null | undefined,
    uploadEndpoint: string = "/api/profile/upload-image"
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
    try {
        // If source is null/undefined, return empty
        if (!source) {
            return { success: false, error: "No image source provided" };
        }

        // If it's already a server URL, return it directly
        if (typeof source === 'string' && source.startsWith('/uploads/')) {
            return { success: true, imageUrl: source };
        }

        // If it's a File, upload it directly
        if (source instanceof File) {
            const formData = new FormData();
            formData.append("image", source);
            const response = await fetch(uploadEndpoint, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                return { success: false, error: `Upload failed: ${errorText}` };
            }

            const data = await response.json();
            return { success: true, imageUrl: data.imageUrl };
        }

        // If it's a data URL or blob URL, convert to File first
        if (typeof source === 'string' && (source.startsWith('data:') || source.startsWith('blob:'))) {
            let blob: Blob;
            let mimeType = 'image/png';
            let filename = 'avatar.png';

            if (source.startsWith('data:')) {
                // Parse data URL
                const matches = source.match(/^data:([^;]+);base64,(.+)$/);
                if (!matches) {
                    return { success: false, error: "Invalid data URL format" };
                }

                mimeType = matches[1];
                const base64Data = matches[2];
                const byteCharacters = atob(base64Data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                blob = new Blob([byteArray], { type: mimeType });

                // Determine filename extension from mime type
                const ext = mimeType.split('/')[1]?.split(';')[0] || 'png';
                filename = `avatar.${ext}`;
            } else if (source.startsWith('blob:')) {
                // Fetch blob URL
                const response = await fetch(source);
                blob = await response.blob();
                mimeType = blob.type || 'image/png';
                const ext = mimeType.split('/')[1]?.split(';')[0] || 'png';
                filename = `avatar.${ext}`;
            } else {
                return { success: false, error: "Unsupported image source format" };
            }

            // Convert blob to File
            const file = new File([blob], filename, { type: mimeType });

            // Upload the file
            const formData = new FormData();
            formData.append("image", file);
            const uploadResponse = await fetch(uploadEndpoint, {
                method: "POST",
                body: formData,
            });

            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text();
                return { success: false, error: `Upload failed: ${errorText}` };
            }

            const uploadData = await uploadResponse.json();
            return { success: true, imageUrl: uploadData.imageUrl };
        }

        return { success: false, error: "Unsupported image source type" };
    } catch (error) {
        console.error("Error uploading image from source:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to upload image"
        };
    }
}

