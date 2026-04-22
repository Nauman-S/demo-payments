import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// The Go server serves the built UI at /demo — asset URLs need that prefix
// in production. In dev, Vite runs on :5173 and proxies /demo/api → :8080.
export default defineConfig({
  plugins: [svelte()],
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
