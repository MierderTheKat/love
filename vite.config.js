import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@context": path.resolve(__dirname, "src/context"),
      "@data": path.resolve(__dirname, "src/data"),
      "@middlewares": path.resolve(__dirname, "src/middlewares"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@router": path.resolve(__dirname, "src/router"),
      "@allRoutes": path.resolve(__dirname, "src/router/routes/allRoutes"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
