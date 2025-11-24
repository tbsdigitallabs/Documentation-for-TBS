import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' https://apis.google.com chrome-extension:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com chrome-extension:; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://apis.google.com https://accounts.google.com;"
          }
        ],
      },
    ]
  },
};

export default nextConfig;
