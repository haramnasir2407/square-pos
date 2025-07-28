import type { NextConfig } from "next";
import MillionLint from "@million/lint";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "items-images-sandbox.s3.us-west-2.amazonaws.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
// export default MillionLint.next({ rsc: true })(nextConfig);
