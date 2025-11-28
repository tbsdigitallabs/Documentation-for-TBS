/**
 * Application Version Token
 * 
 * Centralised version management for LearningLab.
 * Version format: 0.{git-revision-count}
 * 
 * The version is calculated at build time from git revision count
 * and made available via NEXT_PUBLIC_APP_VERSION environment variable.
 */

/**
 * Get the current application version
 * @returns Version string in format "0.{revision-count}" or fallback "0.0"
 */
export function getAppVersion(): string {
  return process.env.NEXT_PUBLIC_APP_VERSION || '0.0';
}

/**
 * Get the version with "v" prefix
 * @returns Version string in format "v0.{revision-count}" or fallback "v0.0"
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
