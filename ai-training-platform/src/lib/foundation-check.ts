/**
 * Foundation Module Access Control
 * 
 * Ensures users complete foundational training before accessing role-specific AI modules.
 * This enforces proper training and security practices.
 */

// Dynamic import to avoid bundling fs module in client-side code
let getAllModules: ((role: string) => any[]) | null = null;

if (typeof window === 'undefined') {
  // Server-side only: import mdx functions that use fs
  getAllModules = require('./mdx').getAllModules;
}

/**
 * Get all foundational module IDs (Session 0 / shared modules)
 * Returns empty array on any error to prevent blocking access
 * Server-side only - uses fs module
 */
export function getFoundationModuleIds(): string[] {
  try {
    // Only work server-side (where fs is available)
    if (typeof window !== 'undefined' || !getAllModules) {
      return [];
    }
    const modules = getAllModules('shared');
    if (!modules || modules.length === 0) {
      // No foundation modules = no requirement, allow access
      return [];
    }
    return modules.map(module => `session-0/${module.slug}`).filter(Boolean);
  } catch (error) {
    // On any error, return empty array to allow access (fail open)
    // This prevents the foundation check from blocking users if there's a file system issue
    return [];
  }
}

/**
 * Check if a user has completed all foundational modules
 * @param completedModules Array of completed module IDs from user profile
 * @returns true if all foundational modules are completed, or if no foundation modules exist
 * Client-safe: On client side, checks if user has any session-0 modules completed
 */
export function hasCompletedFoundation(completedModules: Array<{ moduleId: string }> = []): boolean {
  try {
    // Client-side: Simple check - if user has any session-0 modules, assume foundation is started
    // This is a best-effort check since we can't read filesystem on client
    if (typeof window !== 'undefined') {
      const hasAnyFoundation = completedModules.some(m => m.moduleId?.startsWith('session-0/'));
      // If no foundation modules in list, we can't determine - allow access (fail open)
      // The server-side check will enforce the actual requirement
      return true; // Client-side always allows (server-side enforces)
    }
    
    // Server-side: Full check using file system
    const foundationModuleIds = getFoundationModuleIds();
    
    // If no foundation modules exist, consider it "completed" to allow access
    if (foundationModuleIds.length === 0) {
      return true;
    }
    
    const completedIds = new Set(completedModules.map(m => m.moduleId));
    
    // Check if all foundation modules are completed
    return foundationModuleIds.every(id => completedIds.has(id));
  } catch (error) {
    console.error('Error checking foundation completion:', error);
    // On error, return true to allow access (fail open)
    return true;
  }
}

/**
 * Get the list of incomplete foundational modules
 * @param completedModules Array of completed module IDs from user profile
 * @returns Array of incomplete foundation module IDs
 */
export function getIncompleteFoundationModules(completedModules: Array<{ moduleId: string }> = []): string[] {
  try {
    const foundationModuleIds = getFoundationModuleIds();
    const completedIds = new Set(completedModules.map(m => m.moduleId));
    
    return foundationModuleIds.filter(id => !completedIds.has(id));
  } catch (error) {
    console.error('Error getting incomplete foundation modules:', error);
    // Return empty array on error to prevent blocking
    return [];
  }
}

/**
 * Check if a module ID is a foundational module
 * @param moduleId Module ID to check
 * @returns true if the module is a foundational module
 */
export function isFoundationModule(moduleId: string): boolean {
  return moduleId.startsWith('session-0/');
}
