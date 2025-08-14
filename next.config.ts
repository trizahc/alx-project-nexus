import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "felikz2254.pythonanywhere.com", // your image host
        port: "",
        pathname: "/**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
