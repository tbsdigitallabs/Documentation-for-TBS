"use client";

/**
 * NavbarSpacer - Provides consistent spacing to clear the fixed navbar
 * Calculated: navbar py-2 (8px top) + logo h-10 (40px) + py-2 (8px bottom) = 56px
 * Using 64px (pt-16) for safe clearance
 */
export function NavbarSpacer() {
    return <div className="h-16" />;
}

