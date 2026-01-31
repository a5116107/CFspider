import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    include: ['zustand', 'react', 'style-to-js', 'html-react-parser']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 5174
  }
})
