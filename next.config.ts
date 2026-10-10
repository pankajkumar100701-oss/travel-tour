import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // Off on purpose: with it on (16.4.0), a production first load of /packages?… never resolves the
  // Suspense boundary around the useSearchParams filters, so the filter bar never appears. Works in dev.
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Unsplash serves resized crops from its own CDN, so the loader only sets width and quality.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

export default nextConfig;
