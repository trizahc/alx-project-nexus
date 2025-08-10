import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["felikz2254.pythonanywhere.com"],  // <-- add your image hostname here
  },
};

export default nextConfig;
