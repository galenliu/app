import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path"
// import {viteMockServe} from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        // viteMockServe({
        //     mockPath: 'mock',
        // }),
    ],
    base: "./",
    resolve: {
        alias: {
            comp: resolve(__dirname, 'src/components'),
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
            "/things": {
                target: 'http://127.0.0.1:9090',
                changeOrigin: true,
                ws: true,
            },
            "/groups": {
                target: 'http://127.0.0.1:9090',
                changeOrigin: true,
            }
        }
    }
})



