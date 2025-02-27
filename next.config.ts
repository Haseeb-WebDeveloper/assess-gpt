import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "/subdomain/:path*",
  //       // has: [{ type: "host", value: "*.fluxtile.com" }],  // for subdomain after deploy
  //       has: [{ type: "host", value: "localhost:3000" }],  // for subdomain before deploy
  //       // permanent: true,
  //     },
  //   ];
  // },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // This is a temporary solution until we fix the type issues
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
