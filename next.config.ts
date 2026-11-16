import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // The hero photo is shown at most ~560px wide. Keep the sizes list short
    // so visitors on slow connections get small files.
    deviceSizes: [360, 480, 640, 828, 1080],
    imageSizes: [64, 128, 256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
