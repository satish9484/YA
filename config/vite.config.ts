import autoprefixer from 'autoprefixer';
import path from 'path';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import type { VitePWAOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const isProd = mode === 'production';

    const manifest: Partial<VitePWAOptions> = {
        registerType: 'autoUpdate',
        devOptions: { enabled: !isProd },
        workbox: {
            // Bump up the maximum file size to cache to 5MB
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        },
        manifest: {
            name: process.env.VITE_REACT_APP_NAME ?? 'Yashvi Audio',
            short_name: 'YA',
            description: process.env.VITE_REACT_APP_DESCRIPTION ?? 'Yashvi Audio.',
            theme_color: '#862626',
            background_color: '#523b3b',
            display: 'standalone',
            start_url: '/',
            scope: '/',
            icons: [
                {
                    src: '/logo/favicon/web-app-manifest-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any',
                },
                {
                    src: '/logo/favicon/web-app-manifest-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'maskable',
                },
                {
                    src: '/logo/favicon/web-app-manifest-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any',
                },
                {
                    src: '/logo/favicon/web-app-manifest-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                },
                {
                    src: '/logo/favicon/apple-touch-icon.png',
                    sizes: '180x180',
                    type: 'image/png',
                },
            ],
        },
    };

    const plugins: UserConfig['plugins'] = [
        react({
            jsxRuntime: 'automatic', // Use the new JSX transform
        }),
        tsconfigPaths(),
        VitePWA(manifest),
    ];

    const css: UserConfig['css'] = {
        postcss: {
            plugins: [autoprefixer()],
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
    };

    const server: UserConfig['server'] = {
        port: Number(process.env.PORT) ?? 3000,
        open: true,
        proxy: {
            '/api': 'http://localhost:5000',
        },
    };

    const build: UserConfig['build'] = {
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
    };

    return {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../src'),
            },
        },
        plugins,
        css,
        server,
        build,
    };
});
