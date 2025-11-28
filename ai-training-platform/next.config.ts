import type { NextConfig } from "next";
import { execSync } from "child_process";

// Get git revision count for version number
// Can come from build arg (Docker) or git command (local dev)
function getGitRevisionCount(): string {
  // Check if passed as build arg (Docker builds)
  if (process.env.GIT_REVISION_COUNT) {
    return process.env.GIT_REVISION_COUNT;
  }
  // Fallback to git command (local development)
  try {
    const count = execSync("git rev-list --count HEAD", { encoding: "utf-8" }).trim();
    return count || "0";
  } catch {
    return "0";
  }
}

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  generateBuildId: async () => {
    // Return a unique build ID based on timestamp to force cache invalidation
    return `build-${Date.now()}`;
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: `0.${getGitRevisionCount()}`,
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
