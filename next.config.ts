import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/interactive-lessons",
  assetPrefix: "/interactive-lessons",
  trailingSlash: true,
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
  // webpack: (config, { isServer }) => {
  //   // Load template files as text
  //   config.module.rules.push({
  //     test: /\.template$/,
  //     use: "raw-loader",
  //   });

  //   return config;
  // },
};

export default nextConfig;
