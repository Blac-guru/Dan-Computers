/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Better to fix TypeScript errors for production
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Optimize for Vercel serverless
  output: "standalone",
  // Enable React strict mode for better error checking
  reactStrictMode: true,
  // Optimize production builds
  swcMinify: true,
  // Vercel Analytics (already installed in package.json)
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};

export default nextConfig;
