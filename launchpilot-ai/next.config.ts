import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["vkenhodnwumxtfrdfqtr.supabase.co"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
