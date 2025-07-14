import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "pages": path.resolve(__dirname, "src/pages"),
      "components": path.resolve(__dirname, "src/components"),
      "utils": path.resolve(__dirname, "src/utils"),
    },
  },
  build: {
    outDir: "dist", // ✅ required by Vercel
    chunkSizeWarningLimit: 2000
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    strictPort: true
  }
});
