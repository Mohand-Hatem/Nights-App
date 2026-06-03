import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (
            id.includes("react-router") ||
            id.includes("react-dom") ||
            id.includes("/react/")
          ) {
            return "react-vendor";
          }
          if (id.includes("@tanstack/react-query")) return "query-vendor";
          if (id.includes("framer-motion")) return "motion-vendor";
          if (id.includes("swiper") || id.includes("slick-carousel") || id.includes("react-slick")) {
            return "carousel-vendor";
          }
          if (id.includes("formik") || id.includes("yup")) return "forms-vendor";
          if (id.includes("axios")) return "http-vendor";
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
