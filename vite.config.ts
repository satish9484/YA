import autoprefixer from 'autoprefixer';
import { readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

const srcPath = resolve(__dirname, './src');

// Discover top-level folders inside /src to generate convenient path aliases
const getSrcSubfolders = (basePath: string) =>
    readdirSync(basePath).filter(name => statSync(join(basePath, name)).isDirectory());

const subfolders = getSrcSubfolders(srcPath);
const folderAliases = Object.fromEntries(
    subfolders.map(folder => [`@${folder}`, join(srcPath, folder)]),
);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const isProd = mode === 'production';

    return {
        plugins: [
            react(),
            tsconfigPaths(),
            VitePWA({
                registerType: 'autoUpdate',
                devOptions: { enabled: !isProd },
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
                ...folderAliases,
            },
        },

        css: {
            postcss: {
                plugins: [autoprefixer],
            },
            devSourcemap: !isProd,
            preprocessorOptions: {
                scss: {
                    // Make the design system available everywhere without manual imports
                    additionalData: `@use "@scss/index" as *;`,
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
            cssCodeSplit: false,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom'],
                        styles: ['./src/scss/main.scss'],
                    },
                },
            },
        },
    };
});
