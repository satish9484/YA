#!/bin/bash

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
npm install --save-exact \
   react@latest \
   react-dom@latest \
   react-router-dom@latest \
   react-redux@latest \
   @reduxjs/toolkit \
   axios@latest \
   antd@latest \
   react-toastify@latest

echo "🛠 Installing latest dev dependencies (TypeScript, linting, testing)..."
npm install --save-dev --save-exact \
   typescript@latest \
   @types/node \
   @types/react \
   @types/react-dom \
   vite@6.2.0 \
   @vitejs/plugin-react \
   @vitejs/plugin-react-swc \
   vite-tsconfig-paths@latest \
   vite-plugin-pwa@latest \
   eslint@latest \
   @eslint/js \
   @typescript-eslint/parser \
   @typescript-eslint/eslint-plugin \
   eslint-plugin-import@latest \
   eslint-plugin-react@latest \
   eslint-plugin-react-hooks@latest \
   eslint-plugin-react-refresh@latest \
   eslint-config-prettier@latest \
   globals@latest \
   typescript-eslint@latest \
   prettier@latest \
   prettier-eslint@latest \
   @trivago/prettier-plugin-sort-imports \
   sass@latest \
   vitest@latest \
   @vitest/ui \
   jsdom@latest \
   @testing-library/react \
   @testing-library/jest-dom \
   husky@latest \
   lint-staged@latest \
   npm-check-updates@latest

echo "✅ TypeScript project dependencies fully updated and pinned."
echo "📘 Reminder: Restart your dev server and IDE to pick up new types."
