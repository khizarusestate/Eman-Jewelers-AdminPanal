import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://82-25-105-184.sslip.io",
        changeOrigin: true,
        secure: true
      }
    }
  }
});
