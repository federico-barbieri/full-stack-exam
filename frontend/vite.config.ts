import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This allows Vite to be accessible from outside the container
    port: 5173,       // Change this if you prefer a different port
  },
})
