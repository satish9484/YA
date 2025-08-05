// scripts/generate-update-script.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES Modules for the current script's location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // This will now be '<project_root>/scripts'

function generateUpdateDepsScript() {
    // --- PRODUCTION DEPENDENCIES ---
    const productionDeps = [
        'react',
        'react-dom',
        'react-router-dom',
        'react-redux',
        '@reduxjs/toolkit',
        'axios',
        'antd',
        'react-toastify',
    ];

    // --- DEVELOPMENT DEPENDENCIES ---
    const devDeps = [
        // Type Checking
        'typescript',
        '@types/node',
        '@types/react',
        '@types/react-dom',

        // Build Tooling (Vite)
        'vite@6.2.0',
        '@vitejs/plugin-react',
        '@vitejs/plugin-react-swc',
        'vite-tsconfig-paths',
        'vite-plugin-pwa',

        // Linting & Code Quality
        'eslint',
        '@eslint/js',
        '@typescript-eslint/parser',
        '@typescript-eslint/eslint-plugin',
        'eslint-plugin-import',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'eslint-plugin-react-refresh',
        'eslint-config-prettier',
        'globals',
        'typescript-eslint',

        // Code Formatting
        'prettier',
        'prettier-eslint',
        '@trivago/prettier-plugin-sort-imports',

        // Styling
        'sass',

        // Testing
        'vitest',
        '@vitest/ui',
        'jsdom',
        '@testing-library/react',
        '@testing-library/jest-dom',

        // git
        'husky',
        'lint-staged',

        // Dependency Management
        'npm-check-updates',
    ];

    const prodDepsStr = productionDeps
        .map(dep => (dep.includes('@') ? dep : `${dep}@latest`))
        .join(' \\\n   ');
    const devDepsStr = devDeps
        .map(dep => (dep.includes('@') ? dep : `${dep}@latest`))
        .join(' \\\n   ');

    // MODIFIED: Added npm cache clean command for a more robust reset
    const scriptContent = `#!/bin/bash

# ================================
# ⚙️ Full Dependency Refresh (TS Edition)
# -------------------------------
# This script wipes all existing node modules and lockfiles,
# then installs the latest exact versions of all required
# dependencies for a modern React + Vite + TypeScript stack.
#
# 🎯 Ideal for template resets or syncing a new project with
#    the latest ecosystem tools, while keeping type safety.
#
# !! WARNING: This file is PROGRAMMATICALLY GENERATED. Do not edit directly.
#         Modify 'scripts/generate-update-script.js' to change its content.
# ================================

echo "🧹 Cleaning npm cache to ensure a clean slate..."
npm cache clean --force

echo "🧨 Cleaning up old project dependencies..."
rm -rf node_modules package-lock.json

echo "📦 Installing latest production dependencies..."
npm install --save-exact \\
   ${prodDepsStr}

echo "🛠 Installing latest dev dependencies (TypeScript, linting, testing)..."
npm install --save-dev --save-exact \\
   ${devDepsStr}

echo "✅ TypeScript project dependencies fully updated and pinned."
echo "📘 Reminder: Restart your dev server and IDE to pick up new types."
`;

    const scriptDir = __dirname;
    if (!fs.existsSync(scriptDir)) {
        fs.mkdirSync(scriptDir, { recursive: true });
    }
    const scriptPath = path.join(scriptDir, 'update-deps.sh');

    fs.writeFileSync(scriptPath, scriptContent);
    fs.chmodSync(scriptPath, 0o755);

    console.log(`Generated and updated '${scriptPath}' with latest dependency lists.`);
}

generateUpdateDepsScript();
