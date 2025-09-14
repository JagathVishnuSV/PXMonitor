import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// If your backend runs on a different host/port, change this:
const BACKEND_TARGET = process.env.BACKEND_TARGET || 'http://localhost:3001';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // proxy forwards /api requests to your backend so Vite does not return index.html
    proxy: {
      '/api': {
        target: BACKEND_TARGET,
        changeOrigin: true,
        secure: false,
        ws: false,
        // keep the path as /api/..., so no rewrite required
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
