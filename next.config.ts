import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos uploaded through the /portal live in Vercel Blob.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/posts/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Portal photo uploads: one resized JPEG (well under 1 MB) per request.
      bodySizeLimit: "5mb",
    },
  },
  // Story markdown is read at ISR time, so ship it with the server functions.
  outputFileTracingIncludes: {
    "/**": ["./content/posts/**/*"],
  },
};

export default nextConfig;
