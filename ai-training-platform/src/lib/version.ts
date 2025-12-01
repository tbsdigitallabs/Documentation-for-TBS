/**
 * Application Version Token
 * 
 * Centralised version management for LearningLab.
 * Version format: 0.[REVISION_NUMBER]
 * 
 * Priority:
 * 1. Google Cloud Run K_REVISION (production)
 * 2. NEXT_PUBLIC_APP_VERSION (build-time)
 * 3. Fallback to "0.0"
 */

/**
 * Get the current application version
 * @returns Version string in format "0.{revision-number}" or fallback "0.0"
 */
export function getAppVersion(): string {
  // Priority 1: Google Cloud Run revision number (production)
  const kRevision = process.env.K_REVISION;
  if (kRevision) {
    // Extract revision number from revision name
    // Format: learninglab-XXXXX -> extract XXXXX
    // Also handle formats like: learninglab-00001-abc or just the number
    const match = kRevision.match(/-(\d+)(?:-|$)/);
    if (match && match[1]) {
      const revisionNumber = match[1];
      return `0.${revisionNumber}`;
    }
    // If K_REVISION is just a number, use it directly
    if (/^\d+$/.test(kRevision)) {
      return `0.${kRevision}`;
    }
  }

  // Priority 2: Build-time version from environment variable
  if (process.env.NEXT_PUBLIC_APP_VERSION) {
    return process.env.NEXT_PUBLIC_APP_VERSION;
  }

  // Fallback
  return '0.0';
}

/**
 * Get the version with "v" prefix
 * @returns Version string in format "v0.{revision-number}" or fallback "v0.0"
 */
export function getAppVersionWithPrefix(): string {
  return `v${getAppVersion()}`;
}

/**
 * Version token - use this throughout the application for consistent version display
 */
export const APP_VERSION = getAppVersion();
export const APP_VERSION_WITH_PREFIX = getAppVersionWithPrefix();

/**
 * Full application name with version
 */
export const APP_NAME_WITH_VERSION = `LearningLab ${APP_VERSION_WITH_PREFIX}`;
