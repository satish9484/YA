/**
 * @file config/paths.ts
 * @description Defines the path aliases for the project.
 *
 * This file centralizes all path mappings, making them reusable and easy to manage.
 * By defining aliases here, we ensure consistency across TypeScript, Vite, and any other tools
 * that need to resolve module paths.
 *
 * - `__filename` and `__dirname` are derived using `import.meta.url` to ensure they work
 *   correctly in an ES module context.
 * - `projectRoot` is the absolute path to the root of the project.
 * - `srcPath` is the absolute path to the 'src' directory.
 * - `pathAliases` exports a set of key-value pairs that map aliases (e.g., '@') to their
 *   corresponding absolute paths.
 */
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// ES module-safe way to get __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the absolute path to the project root
const projectRoot = resolve(__dirname, '..');
// console.log(projectRoot);

// Define the absolute path to the 'src' directory
const srcPath = resolve(projectRoot, 'src');
// console.log(srcPath);

// Define the main source directories that should have aliases
const mainSrcDirectories = [
    'assets',
    'components',
    'contexts',
    'hooks',
    'pages',
    'redux',
    'scss',
    'types',
    'utills',
];

// Create aliases only for the main directories
const srcAliases = Object.fromEntries(
    mainSrcDirectories.map(folder => [`@${folder}`, resolve(srcPath, folder)]),
);

/**
 * A map of path aliases to their corresponding absolute paths.
 *
 * Use these aliases to simplify imports in your application code.
 * For example, instead of `import Button from '../../components/Button'`,
 * you can use `import Button from '@/components/Button'`.
 *
 * These aliases must be configured in both `tsconfig.json` (for TypeScript)
 * and `vite.config.ts` (for Vite's bundler).
 */

// console.log(srcAliases);
export const pathAliases = {
    '@': srcPath,
    '@config': resolve(projectRoot, 'config'),
    ...srcAliases,
};
