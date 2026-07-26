import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    fs: {
      allow: ['.', 'C:/Users/DELL/.gemini/antigravity-ide/brain/0ec0b2b1-9104-4782-afc5-61a448290d11']
    }
  }
})
