import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/interactive-lessons",
  assetPrefix: "/interactive-lessons",
  experimental: {
    turbo: {
      rules: {
        "*.template": {
          loaders: ["raw-loader"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
