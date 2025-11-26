/**
 * Role and Class Mapping Utilities
 * Maps class names to route paths and handles role-to-class conversion
 */

import { CLASS_NAMES, CLASS_ROUTES, CLASS_JOB_TITLES, type ClassName } from './constants';

export type { ClassName };

export interface ClassInfo {
  name: ClassName;
  route: string;
  displayName: string;
  jobTitle: string;
}

const CLASS_MAP: Record<ClassName, ClassInfo> = {
  [CLASS_NAMES.DEVELOPERS]: {
    name: CLASS_NAMES.DEVELOPERS,
    route: CLASS_ROUTES[CLASS_NAMES.DEVELOPERS],
    displayName: CLASS_NAMES.DEVELOPERS,
    jobTitle: CLASS_JOB_TITLES[CLASS_NAMES.DEVELOPERS],
  },
  [CLASS_NAMES.DESIGNERS]: {
    name: CLASS_NAMES.DESIGNERS,
    route: CLASS_ROUTES[CLASS_NAMES.DESIGNERS],
    displayName: CLASS_NAMES.DESIGNERS,
    jobTitle: CLASS_JOB_TITLES[CLASS_NAMES.DESIGNERS],
  },
  [CLASS_NAMES.PROJECT_MANAGERS]: {
    name: CLASS_NAMES.PROJECT_MANAGERS,
    route: CLASS_ROUTES[CLASS_NAMES.PROJECT_MANAGERS],
    displayName: CLASS_NAMES.PROJECT_MANAGERS,
    jobTitle: CLASS_JOB_TITLES[CLASS_NAMES.PROJECT_MANAGERS],
  },
  [CLASS_NAMES.CONTENT_CREATORS]: {
    name: CLASS_NAMES.CONTENT_CREATORS,
    route: CLASS_ROUTES[CLASS_NAMES.CONTENT_CREATORS],
    displayName: CLASS_NAMES.CONTENT_CREATORS,
    jobTitle: CLASS_JOB_TITLES[CLASS_NAMES.CONTENT_CREATORS],
  },
  [CLASS_NAMES.SALES]: {
    name: CLASS_NAMES.SALES,
    route: CLASS_ROUTES[CLASS_NAMES.SALES],
    displayName: CLASS_NAMES.SALES,
    jobTitle: CLASS_JOB_TITLES[CLASS_NAMES.SALES],
  },
  [CLASS_NAMES.FOUNDATION]: {
    name: CLASS_NAMES.FOUNDATION,
    route: CLASS_ROUTES[CLASS_NAMES.FOUNDATION],
    displayName: CLASS_NAMES.FOUNDATION,
    jobTitle: CLASS_JOB_TITLES[CLASS_NAMES.FOUNDATION],
  },
};

/**
 * Get the route path for a given class name
 */
export function getClassRoute(selectedClass: string): string {
  const classInfo = CLASS_MAP[selectedClass as ClassName];
  return classInfo?.route || "/class-selection";
}

/**
 * Map a role string to a class name based on keywords
 * Used as fallback if class wasn't explicitly selected
 */
export function mapRoleToClass(role: string): ClassName | null {
  if (!role) return null;

  const lowerRole = role.toLowerCase();

  // Developers
  if (
    lowerRole.includes("developer") ||
    lowerRole.includes("engineer") ||
    lowerRole.includes("coder") ||
    lowerRole.includes("programmer")
  ) {
    return CLASS_NAMES.DEVELOPERS;
  }

  // Designers
  if (lowerRole.includes("designer") || lowerRole.includes("design")) {
    return CLASS_NAMES.DESIGNERS;
  }

  // Project Managers / Account Managers
  if (
    lowerRole.includes("project manager") ||
    lowerRole.includes("pm") ||
    lowerRole.includes("account manager") ||
    lowerRole.includes("am") ||
    lowerRole === "pm" ||
    lowerRole === "am"
  ) {
    return CLASS_NAMES.PROJECT_MANAGERS;
  }

  // Content Creators
  if (
    lowerRole.includes("content") ||
    lowerRole.includes("writer") ||
    lowerRole.includes("pr") ||
    lowerRole.includes("public relations")
  ) {
    return CLASS_NAMES.CONTENT_CREATORS;
  }

  // Sales & Business
  if (lowerRole.includes("sales") || lowerRole.includes("business")) {
    return CLASS_NAMES.SALES;
  }

  return null;
}

/**
 * Get display name for a class
 */
export function getClassDisplayName(selectedClass: string): string {
  const classInfo = CLASS_MAP[selectedClass as ClassName];
  return classInfo?.displayName || selectedClass;
}

/**
 * Get job title for a class
 */
export function getClassJobTitle(selectedClass: string): string {
  const classInfo = CLASS_MAP[selectedClass as ClassName];
  return classInfo?.jobTitle || selectedClass;
}

/**
 * Get all available classes
 */
export function getAllClasses(): ClassInfo[] {
  return Object.values(CLASS_MAP);
}

/**
 * Check if a class name is valid
 */
export function isValidClass(className: string): boolean {
  return className in CLASS_MAP;
}

// Re-export constants for convenience
export { CLASS_NAMES, CLASS_ROUTES, CLASS_JOB_TITLES };
