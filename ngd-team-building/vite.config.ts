import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        imagetools({
            defaultDirectives: (url) => {
                // Auto-optimize JPG images in the Images folder
                if (url.pathname.includes('/Images/') && url.pathname.endsWith('.jpg')) {
                    return new URLSearchParams({
                        format: 'webp',
                        quality: '80',
                        w: '1200',
                    })
                }
                // Also optimize PNG images in Images folder (like payment-info)
                if (url.pathname.includes('/Images/') && url.pathname.endsWith('.png')) {
                    return new URLSearchParams({
                        format: 'webp',
                        quality: '85',
                        w: '1200',
                    })
                }
                // Optimize Food images
                if (url.pathname.includes('/Foods/') && url.pathname.endsWith('.png')) {
                    return new URLSearchParams({
                        format: 'webp',
                        quality: '85',
                        w: '800',
                    })
                }
                return new URLSearchParams()
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    // Image optimization settings
    build: {
        // Increase chunk size warning limit for images
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                // Separate image assets
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name?.split('.') ?? []
                    const ext = info[info.length - 1]
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
                        return `assets/images/[name]-[hash][extname]`
                    }
                    return `assets/[name]-[hash][extname]`
                },
            },
        },
    },
    // Note: API routes in /api directory work automatically on Vercel
    // For local testing, use `vercel dev` to run serverless functions locally
})
