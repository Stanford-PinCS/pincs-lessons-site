import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pickcode",
  assetPrefix: "/pickcode",
  trailingSlash: true,
};

export default nextConfig;
