import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split chunks for better caching and smaller initial load
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React - smallest chunk, loads first
          if (id.includes('react-dom') || id.includes('node_modules/react/')) {
            return 'vendor-react';
          }
          // Three.js core - separate heavy chunk
          if (id.includes('node_modules/three/')) {
            return 'vendor-three-core';
          }
          // Drei helpers - separate from core
          if (id.includes('@react-three/drei')) {
            return 'vendor-three-drei';
          }
          // Fiber - separate
          if (id.includes('@react-three/fiber')) {
            return 'vendor-three-fiber';
          }
          // Postprocessing - can be lazy loaded
          if (id.includes('postprocessing') || id.includes('@react-three/postprocessing')) {
            return 'vendor-postprocessing';
          }
          // Framer motion - lazy load
          if (id.includes('framer-motion')) {
            return 'vendor-motion';
          }
        },
      },
    },
    // Smaller chunk size warning
    chunkSizeWarningLimit: 200,
    // Use esbuild for faster minification (instead of terser)
    minify: 'esbuild',
    // Target modern browsers for smaller bundle
    target: 'es2020',
    // Enable source maps for debugging (disable in production)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    // Exclude heavy deps from pre-bundling to speed up dev
    exclude: ['@react-three/postprocessing'],
  },
  // Enable tree-shaking
  esbuild: {
    // Remove console and debugger in production
    drop: ['console', 'debugger'],
    // Pure annotations for better tree-shaking
    pure: ['console.log', 'console.info', 'console.debug'],
  },
})
