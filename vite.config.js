import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig as defineVitePressConfig } from 'vitepress'

export default defineConfig({
  plugins: [react()],
  // VitePress-specific config
  ...defineVitePressConfig({
    title: 'SSC CGL Tracker'
  })
})
