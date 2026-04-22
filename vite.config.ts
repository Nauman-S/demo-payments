import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The Go server serves the built UI at /demo — so asset URLs need that prefix
// in production. In dev, Vite runs on :5173 and proxies /demo/api → :8080.
export default defineConfig({
  plugins: [react()],
  base: "/demo/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      "/demo/api": {
        target: "http://localhost:8080",
        changeOrigin: false,
      },
    },
  },
});
