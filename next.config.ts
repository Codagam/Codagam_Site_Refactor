import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blr1.digitaloceanspaces.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Note: eslint config moved to eslint.config.mjs (Next.js 16+)
};

export default nextConfig;
