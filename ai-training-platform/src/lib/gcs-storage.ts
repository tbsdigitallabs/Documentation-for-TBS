/**
 * Google Cloud Storage adapter for image uploads
 * Replaces local filesystem storage with persistent Cloud Storage
 */

import { Storage } from '@google-cloud/storage';

let storage: Storage | null = null;

function getStorageInstance(): Storage {
  if (storage) {
    return storage;
  }

  // Initialize Cloud Storage
  // Uses Application Default Credentials (ADC) in Cloud Run
  // On Cloud Run, ADC automatically detects project from metadata server
  // For local dev, set GOOGLE_APPLICATION_CREDENTIALS env var to point to service account key
  storage = new Storage();

  return storage;
}

const BUCKET_NAME = process.env.GCS_BUCKET_NAME || 'learninglab-storage';
const SUBDIRECTORY = 'profiles';

export interface UploadResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

/**
 * Uploads an image file to Cloud Storage
 */
export async function uploadImageToGCS(
  file: File,
  userEmail: string,
  subdirectory: string = SUBDIRECTORY
): Promise<UploadResult> {
  try {
    const storageInstance = getStorageInstance();
    const bucket = storageInstance.bucket(BUCKET_NAME);

    // Validate file exists
    if (!file) {
      return { success: false, error: 'No image provided' };
    }

    // Validate file type by MIME type
    const ALLOWED_MIME_TYPES = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ];

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return { success: false, error: 'File must be a valid image (JPEG, PNG, GIF, WebP, or SVG)' };
    }

    // Validate file size (5MB max)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: 'Image must be less than 5MB' };
    }

    // Validate file extension
    const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return { success: false, error: 'Invalid file extension. Only JPEG, PNG, GIF, WebP, and SVG are allowed' };
    }

    // Sanitize email for filename (prevent path traversal)
    const sanitizedEmail = userEmail.replace(/[^a-zA-Z0-9@._-]/g, '_').substring(0, 100);

    // Generate unique filename with timestamp and sanitized email
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const filename = `${sanitizedEmail}_${timestamp}_${randomSuffix}.${fileExtension}`;
    const filepath = `${subdirectory}/${filename}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloud Storage (keep files private)
    const gcsFile = bucket.file(filepath);
    
    // Upload file with metadata (file remains private)
    await gcsFile.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          uploadedBy: userEmail,
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    // Return the API route URL that will serve the image (authenticated proxy)
    // Store the filepath, not a public URL
    const imageUrl = `/api/images/${filepath}`;

    return { success: true, imageUrl };
  } catch (error) {
    console.error('Error uploading image to Cloud Storage:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload image',
    };
  }
}

/**
 * Deletes an image from Cloud Storage
 */
export async function deleteImageFromGCS(imageUrl: string): Promise<boolean> {
  try {
    const storageInstance = getStorageInstance();
    const bucket = storageInstance.bucket(BUCKET_NAME);

    // Extract file path from URL
    // Handle multiple URL formats:
    // - /api/images/profiles/filename.jpg (API route format)
    // - https://storage.googleapis.com/BUCKET_NAME/path/to/file.jpg (legacy public URL)
    // - gs://BUCKET_NAME/path/to/file.jpg
    let filepath: string;

    if (imageUrl.startsWith('/api/images/')) {
      // API route format - extract path after /api/images/
      filepath = imageUrl.replace('/api/images/', '');
    } else if (imageUrl.startsWith('gs://')) {
      // gs:// format
      filepath = imageUrl.replace(`gs://${BUCKET_NAME}/`, '');
    } else if (imageUrl.includes(BUCKET_NAME)) {
      // HTTP/HTTPS format - extract path after bucket name
      const bucketIndex = imageUrl.indexOf(BUCKET_NAME);
      filepath = imageUrl.substring(bucketIndex + BUCKET_NAME.length + 1);
    } else {
      // Assume it's already a relative path (legacy local uploads)
      filepath = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
    }

    // Validate filepath is not empty
    if (!filepath || filepath.trim() === '') {
      console.error('Invalid file path extracted from URL:', imageUrl);
      return false;
    }

    const file = bucket.file(filepath);
    await file.delete();

    return true;
  } catch (error) {
    console.error('Error deleting image from Cloud Storage:', error);
    return false;
  }
}

