import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // i18n configuration
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"]
  },
};

export default nextConfig;
