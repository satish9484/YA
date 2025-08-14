import autoprefixer from 'autoprefixer';
import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import react from '@vitejs/plugin-react';

const srcPath = resolve(__dirname, '../src');

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const isProd = mode === 'production';
    console.log(isProd);

    return {
        plugins: [
            react(),
            VitePWA({
                registerType: 'autoUpdate',
                // devOptions: { enabled: !isProd },
                workbox: {
                    // Bump up the maximum file size to cache to 5MB
                    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
                },
                manifest: {
                    name: 'Yashvi Audio',
                    short_name: 'YA',
                    description: 'Yashvi Audio.',
                    theme_color: '#ffffff',
                    background_color: '#ffffff',
                    display: 'standalone',
                    start_url: '/',
                    scope: '/',
                    icons: [
                        {
                            src: '/favicon_io/android-chrome-192x192.png',
                            sizes: '192x192',
                            type: 'image/png',
                        },
                        {
                            src: '/favicon_io/android-chrome-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                        },
                        {
                            src: '/favicon_io/android-chrome-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any maskable',
                        },
                        {
                            src: '/favicon_io/apple-touch-icon.png',
                            sizes: '180x180',
                            type: 'image/png',
                        },
                    ],
                },
            }),
        ],

        resolve: {
            alias: {
                '@': srcPath,
                '@scss': join(srcPath, 'scss'),
            },
        },

        css: {
            postcss: {
                plugins: [autoprefixer],
            },
            devSourcemap: false,
            preprocessorOptions: {
                scss: {
                    // Make the design system available everywhere without manual imports
                    additionalData: `@use "@/scss/_index.scss" as *;`,
                },
            },
            modules: {
                localsConvention: 'camelCase',
            },
        },

        server: {
            port: Number(process.env.PORT) || 3000,
            open: true,
            proxy: {
                '/api': 'http://localhost:5000',
            },
        },

        build: {
            target: 'esnext',
            // Use fast minification in all modes; switch to 'terser' only if added as a dep
            minify: isProd ? 'esbuild' : false,
            sourcemap: !isProd,
            outDir: 'dist',
            cssCodeSplit: true, // Enable CSS code splitting
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom'],
                    },
                },
            },
        },
    };
});
