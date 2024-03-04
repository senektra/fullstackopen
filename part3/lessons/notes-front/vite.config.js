import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) =>  {
  const env = loadEnv(mode, process.cwd())
  const backendUrl = mode === 'production' ?
    env.VITE_BACKEND_PROD_URL
    : env.VITE_BACKEND_DEV_URL
  return {
    plugins: [react()],
    define: {
      __API_URL__: JSON.stringify(backendUrl)
    }
  }
})
