import type { NextConfig } from "next";

const nextConfig: NextConfig = {

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
      }, {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      }
    ],
  }, experimental: {
    middlewarePrefetch: "flexible",
  },
};

export default nextConfig;
