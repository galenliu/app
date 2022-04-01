import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),],
    resolve: {
        alias: {
            // "@components": resolve(__dirname, 'src/components'),
            'src': resolve(__dirname, 'src'),
            '@': resolve(__dirname, './'),
            "@views": resolve(__dirname, "src/views"),
            "@thing": resolve(__dirname, "src/js/capability"),
            "@property": resolve(__dirname, "src/js/property"),
            "@images": resolve(__dirname, "src/static/images")
        }
    },

    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            }
        },
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]- [hash].js',
                entryFileNames: 'js/[name]- [hash].js',
                assetFileNames: '[ext]/[name]- [hash].[ext]',
            },
        },
    },

    server: {
        open: true,//启动项目自动弹出浏览器
        port: 3000,//启动端口
        proxy: {
            '/things': {
                target: 'http://127.0.0.1:9090',
                // changeOrigin: true,
                ws: true,
            },
            '/groups': {
                target: 'http://127.0.0.1:9090',
                changeOrigin: true,
            },
            '/addons': {
                target: 'http://127.0.0.1:9090',
                changeOrigin: true,
            },
            '/settings': {
                target: 'http://127.0.0.1:9090',
                changeOrigin: true,
            },
            '/new_things': {
                target: 'http://127.0.0.1:9090',
                changeOrigin: true,
                ws: true,
            },
            '/actions': {
                target: 'http://127.0.0.1:9090',
                changeOrigin: true,
            }
        }
    }
})

