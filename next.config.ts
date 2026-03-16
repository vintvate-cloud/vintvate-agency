import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "localhost", // Allow local images if needed
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
      allowedOrigins: [process.env.NEXTAUTH_URL].filter(Boolean) as string[],
    },
  },
};

export default nextConfig;
