import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Enable standalone mode for Docker/Render
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
