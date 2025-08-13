import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/interactive-lessons",
  assetPrefix: "/interactive-lessons",
  trailingSlash: false,
  async headers() {
    return [
      {
        source: "/api/auth/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "Vary", value: "Cookie" },
        ],
      },
    ];
  },
  experimental: {
    turbo: {
      rules: {
        "*.template": {
          loaders: ["raw-loader"],
          as: "*.js",
        },
        "*.md": {
          loaders: ["raw-loader"],
          as: "*.js",
        },
      },
    },
  },
  webpack: (config, { isServer }) => {
    // Load template files & markdown files as text
    config.module.rules.push({
      test: /\.template$/,
      use: "raw-loader",
    });
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
};

export default nextConfig;
