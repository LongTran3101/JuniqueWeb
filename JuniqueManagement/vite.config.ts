import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // ⚡ Port bạn muốn chạy dev server
    open: true, // Tự động mở trình duyệt khi chạy
  },
})
