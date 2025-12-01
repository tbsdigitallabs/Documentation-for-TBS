/**
 * Client-side image upload utilities
 * These functions use browser APIs and should only be imported in client components
 */

/**
 * Uploads an image from various sources (File, data URL, blob URL, or server URL)
 * Returns the server URL for the uploaded image
 * 
 * This function is client-only and uses browser APIs (fetch, FormData, File, Blob, atob)
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

