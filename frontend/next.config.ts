import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["192.168.0.78"],
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
