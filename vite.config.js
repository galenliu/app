import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: 'http://192.168.1.100:9090',
                changeOrigin: true,
                ws: true,
                rewrite: path => path.replace(/^\/api/, ''),
            }
        }
    }
})


