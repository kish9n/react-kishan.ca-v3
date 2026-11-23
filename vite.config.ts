import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ["EMAIL_", "VITE_EMAIL_"]);
  // Older deployments use unprefixed names for these three browser settings.
  const define: Record<string, string> = {};
  for (const key of ["EMAIL_SERVICE_ID", "EMAIL_TEMPLATE_ID", "EMAIL_PUBLIC_KEY"]) {
    const publicKey = `VITE_${key}`;
    if (!env[publicKey] && env[key]) {
      define[`import.meta.env.${publicKey}`] = JSON.stringify(env[key]);
    }
  }
  return {
    plugins: [react()],
    define,
    build: { outDir: "build" },
    test: { environment: "jsdom", setupFiles: "./src/setupTests.ts" },
  };
});
