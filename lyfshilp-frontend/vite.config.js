import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const DEFAULT_BACKEND =
  "https://lyfshilp-backend-210425516679.asia-south1.run.app/api";

function normalizeBackendUrl(raw) {
  const s = (raw || "").trim();
  if (!s) return DEFAULT_BACKEND;
  const noTrail = s.replace(/\/+$/, "");
  if (/\/api$/i.test(noTrail)) return noTrail;
  return `${noTrail}/api`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const razorpayUrl = (env.RAZORPAY_URL || env.VITE_RAZORPAY_URL || "").trim();
  const backendUrl = normalizeBackendUrl(
    env.BACKEND_URL || env.VITE_BACKEND_URL,
  );

  return {
    plugins: [react()],
    define: {
      __RAZORPAY_URL__: JSON.stringify(razorpayUrl),
      __BACKEND_URL__: JSON.stringify(backendUrl),
    },
  };
});
