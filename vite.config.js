import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/mealdb': {
        target: 'https://www.themealdb.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mealdb/, '/api/json/v1/1'),
      },
    },
  },
})