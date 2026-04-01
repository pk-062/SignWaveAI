import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@mediapipe/hands", "@mediapipe/camera_utils", "@mediapipe/drawing_utils"],
};

export default nextConfig;
