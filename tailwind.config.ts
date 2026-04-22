import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,svelte}"],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
