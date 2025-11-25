/**
 * Role and Class Mapping Utilities
 * Maps class names (Artificer, Bard, etc.) to route paths and handles role-to-class conversion
 */

export type ClassName = "Artificer" | "Bard" | "Paladin" | "Storyteller" | "Rogue" | "Session 0";

export interface ClassInfo {
  name: ClassName;
  route: string;
  displayName: string;
  jobTitle: string;
}

const CLASS_MAP: Record<ClassName, ClassInfo> = {
  "Artificer": {
    name: "Artificer",
    route: "/developers",
    displayName: "Artificer",
    jobTitle: "Developers",
  },
  "Bard": {
    name: "Bard",
    route: "/designers",
    displayName: "Bard",
    jobTitle: "Designers",
  },
  "Paladin": {
    name: "Paladin",
    route: "/project-managers",
    displayName: "Paladin",
    jobTitle: "Project Managers",
  },
  "Storyteller": {
    name: "Storyteller",
    route: "/content-creators",
    displayName: "Storyteller",
    jobTitle: "Content Creators & PR",
  },
  "Rogue": {
    name: "Rogue",
    route: "/sales-business-dev",
    displayName: "Rogue",
    jobTitle: "Sales & Business",
  },
  "Session 0": {
    name: "Session 0",
    route: "/session-0",
    displayName: "Session 0",
    jobTitle: "Foundational Knowledge",
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
export function mapRoleToClass(role: string): string | null {
  if (!role) return null;

  const lowerRole = role.toLowerCase();

  // Artificer (Developers)
  if (
    lowerRole.includes("developer") ||
    lowerRole.includes("engineer") ||
    lowerRole.includes("coder") ||
    lowerRole.includes("programmer")
  ) {
    return "Artificer";
  }

  // Bard (Designers)
  if (lowerRole.includes("designer") || lowerRole.includes("design")) {
    return "Bard";
  }

  // Paladin (Project Managers / Account Managers)
  if (
    lowerRole.includes("project manager") ||
    lowerRole.includes("pm") ||
    lowerRole.includes("account manager") ||
    lowerRole.includes("am") ||
    lowerRole === "pm" ||
    lowerRole === "am"
  ) {
    return "Paladin";
  }

  // Storyteller (Content Creators)
  if (
    lowerRole.includes("content") ||
    lowerRole.includes("writer") ||
    lowerRole.includes("pr") ||
    lowerRole.includes("public relations")
  ) {
    return "Storyteller";
  }

  // Rogue (Sales & Business)
  if (lowerRole.includes("sales") || lowerRole.includes("business")) {
    return "Rogue";
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

