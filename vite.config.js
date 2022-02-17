import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,//启动项目自动弹出浏览器
    port: 4000,//启动端口
    proxy: {
      "/": {
        target: 'http://127.0.0.1:9090',
        changeOrigin: true,
        ws: true,
        // rewrite: path => path.replace(/^\//, ''),
      }
    }
  }
})



