import type { NextConfig } from "next";

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
};

export default nextConfig;
