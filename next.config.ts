import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.spoonacular.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "spoonacular.com",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
