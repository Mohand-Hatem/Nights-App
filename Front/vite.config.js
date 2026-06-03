import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // Keep all React core + libraries that call createContext in one chunk
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('react-router') ||
            id.includes('react-slick') ||
            id.includes('swiper') ||
            id.includes('@react-oauth') ||
            id.includes('react-hot-toast') ||
            id.includes('react-icons') ||
            id.includes('react-paginate') ||
            id.includes('react-spinners') ||
            id.includes('react-fast-marquee') ||
            id.includes('@tanstack/react-query')
          ) {
            return 'react-vendor';
          }
          if (id.includes('framer-motion')) return 'motion-vendor';
          if (id.includes('formik') || id.includes('yup')) return 'forms-vendor';
          if (id.includes('axios')) return 'http-vendor';
          // slick-carousel is CSS-only jQuery plugin — safe to omit from react chunk
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
