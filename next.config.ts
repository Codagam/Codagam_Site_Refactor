import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Note: eslint config moved to eslint.config.mjs (Next.js 16+)
  // Set Turbopack root explicitly to current directory to avoid workspace detection issues
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
