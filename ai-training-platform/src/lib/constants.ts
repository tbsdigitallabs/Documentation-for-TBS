/**
 * Application Constants
 * Centralised values that may change - update here to apply everywhere
 */

// Operative Class Names (Cyberpunk/Shadowrun inspired)
export const CLASS_NAMES = {
  DEVELOPERS: "Netrunner",
  DESIGNERS: "Artisan", 
  PROJECT_MANAGERS: "Fixer",
  CONTENT_CREATORS: "Media",
  SALES: "Face",
  FOUNDATION: "Foundation",
} as const;

// Route slugs for each class
export const CLASS_ROUTES = {
  [CLASS_NAMES.DEVELOPERS]: "/developers",
  [CLASS_NAMES.DESIGNERS]: "/designers",
  [CLASS_NAMES.PROJECT_MANAGERS]: "/project-managers",
  [CLASS_NAMES.CONTENT_CREATORS]: "/content-creators",
  [CLASS_NAMES.SALES]: "/sales-business-dev",
  [CLASS_NAMES.FOUNDATION]: "/session-0",
} as const;

// Job titles for each class
export const CLASS_JOB_TITLES = {
  [CLASS_NAMES.DEVELOPERS]: "Developers",
  [CLASS_NAMES.DESIGNERS]: "Designers",
  [CLASS_NAMES.PROJECT_MANAGERS]: "Project Managers",
  [CLASS_NAMES.CONTENT_CREATORS]: "Content Creators & PR",
  [CLASS_NAMES.SALES]: "Sales & Business",
  [CLASS_NAMES.FOUNDATION]: "Core Training",
} as const;

// Reverse mapping: route slug to class name
export const ROUTE_TO_CLASS = {
  "developers": CLASS_NAMES.DEVELOPERS,
  "designers": CLASS_NAMES.DESIGNERS,
  "project-managers": CLASS_NAMES.PROJECT_MANAGERS,
  "content-creators": CLASS_NAMES.CONTENT_CREATORS,
  "sales-business-dev": CLASS_NAMES.SALES,
  "session-0": CLASS_NAMES.FOUNDATION,
} as const;

// Type for class names
export type ClassName = typeof CLASS_NAMES[keyof typeof CLASS_NAMES];

// All class names as array (excluding Foundation for selection screens)
export const SELECTABLE_CLASSES = [
  CLASS_NAMES.DEVELOPERS,
  CLASS_NAMES.DESIGNERS,
  CLASS_NAMES.PROJECT_MANAGERS,
  CLASS_NAMES.CONTENT_CREATORS,
  CLASS_NAMES.SALES,
] as const;

// All classes including Foundation
export const ALL_CLASSES = [
  ...SELECTABLE_CLASSES,
  CLASS_NAMES.FOUNDATION,
] as const;
