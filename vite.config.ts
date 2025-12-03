import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  base:'/bapetco-new-web/',
  resolve: {
    alias: {
      // Force R3F to use the same React instance as the DOM
      react: 'react', 
      'react-dom': 'react-dom',
    },
  },
})
