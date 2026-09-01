import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Matikan source maps production untuk menghemat RAM
  productionBrowserSourceMaps: false,
  // Matikan eslint/typescript checking ganda saat build agar hemat resource
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // Nonaktifkan parallel compilation worker yang menyebabkan bus error di container kecil
    config.parallelism = 1;
    return config;
  },
};

export default nextConfig;