import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    // VitePWA di-comment dulu biar nggak error
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   ...
    // }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          preloadImages: `
            <link rel="preload" as="image" href="/assets/profile-picture.webp" type="image/webp" fetchpriority="high">
            <link rel="preload" as="font" href="/fonts/NunitoSans-Bold.woff2" type="font/woff2" crossorigin="anonymous">
          `
        }
      }
    }),
  ],
  assetsInclude: ['**/*.glb'],  // ← TAMBAHKAN BARIS INI untuk load file .glb
  build: {
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          const criticalImages = ['profile-picture.webp'];
          
          if (criticalImages.includes(assetInfo.name)) {
            return 'assets/[name][extname]';
          }
          
          const imgExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg'];
          const fontExtensions = ['.woff', '.woff2', '.eot', '.ttf', '.otf'];
          const isImage = imgExtensions.some(ext => assetInfo.name?.endsWith(ext));
          const isFont = fontExtensions.some(ext => assetInfo.name?.endsWith(ext));
          
          if (isFont) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          
          if (isImage) {
            return 'assets/images/[name]-[hash][extname]';
          }
          
          return 'assets/[name]-[hash][extname]';
        },
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        }
      },
    },
    cssMinify: 'esbuild',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      overlay: false
    },
    headers: {
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  },
  preview: {
    port: 4173,
    strictPort: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff'
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@vite/client', '@vite/env']
  }
});