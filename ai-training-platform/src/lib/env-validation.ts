/**
 * Environment variable validation
 * Validates required environment variables at startup
 */

export function validateEnv() {
    const required = [
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "NEXTAUTH_SECRET",
        "NEXTAUTH_URL",
    ];

    const missing: string[] = [];

    for (const key of required) {
        if (!process.env[key]) {
            missing.push(key);
        }
    }

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(", ")}`
        );
    }

    // Validate NEXTAUTH_URL format
    if (process.env.NEXTAUTH_URL) {
        try {
            new URL(process.env.NEXTAUTH_URL);
        } catch {
            throw new Error("NEXTAUTH_URL must be a valid URL");
        }
    }
}

// Validate on module load (server-side only, runtime only)
// Skip validation during build time
if (typeof window === "undefined" && process.env.NEXT_PHASE !== "phase-production-build") {
    try {
        validateEnv();
    } catch (error) {
        // Only throw in production runtime to prevent blocking development/build
        if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build") {
            throw error;
        } else {
            console.warn("Environment validation warning:", (error as Error).message);
        }
    }
}

