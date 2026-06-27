import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["192.168.0.78"],
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080*",
      },
    ];
  },
};

export default nextConfig;
