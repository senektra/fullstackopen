import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      target: browserslistToTargets(browserslist('>= 0.25%'))
    }
  },
  build: {
    cssMinify: 'lightningcss',
  }
})
