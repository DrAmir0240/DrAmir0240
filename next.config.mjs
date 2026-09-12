import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    // optimizePackageImports for MUI and Lucide
    optimizePackageImports: ["@mui/material", "@mui/icons-material", "lucide-react", "three"],
  },
};

export default withNextIntl(nextConfig);
