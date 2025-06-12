import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/interactive-lessons",
  assetPrefix: "/interactive-lessons",
  trailingSlash: true,
};

export default nextConfig;
