import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Locally-generated placeholder art is SVG; safe since it's all
    // produced by our own build script (no third-party SVG sources).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
