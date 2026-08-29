import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: [],
  allowedDevOrigins: ['10.163.108.224', 'localhost'],
};

export default nextConfig;
