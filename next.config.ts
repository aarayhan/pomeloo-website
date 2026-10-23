import type { NextConfig } from "next";

// Fully static: `next build` writes out/, which Netlify serves as is. No server, no tracking.
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;
