import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages lives at /Rival-app/. The iPhone build and local dev use relative paths.
  base: process.env.PAGES_BASE || './',
  plugins: [react(), tailwindcss()],
})
