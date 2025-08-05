import { readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

const srcPath = resolve(__dirname, './src');

// Get all folders inside /src
const getSrcSubfolders = (basePath: string) =>
    readdirSync(basePath).filter(name => statSync(join(basePath, name)).isDirectory());

const subfolders = getSrcSubfolders(srcPath);

// Optional: auto-generate alias map
const folderAliases = Object.fromEntries(
    subfolders.map(folder => [`@${folder}`, join(srcPath, folder)]),
);

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true, // Enable PWA in development for testing
            },
            manifest: {
                name: 'React Vite Template',
                short_name: 'ReactVite',
                description: 'A feature-rich React Vite template with PWA support.',
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
            '@': srcPath, // Base alias
            ...folderAliases, // Dynamic aliases for each subfolder
        },
    },
    server: {
        port: 3000,
        open: true,
        proxy: {
            '/api': 'http://localhost:5000',
        },
    },
    build: {
        target: 'esnext',
        minify: 'terser',
        sourcemap: true,
        outDir: 'dist',
    },
});
