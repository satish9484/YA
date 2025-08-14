/**
 * This is the main ESLint configuration file for the project.
 * ESLint is a tool that analyzes your code to quickly find problems,
 * such as potential bugs, stylistic errors, and bad practices.
 *
 * @see https://eslint.org/docs/latest/use/configure/
 */
module.exports = {
    // `root: true` tells ESLint to stop looking for configuration files in parent directories.
    // This is useful for monorepos or projects with nested ESLint configs.
    root: true,

    // A list of files and directories that ESLint should completely ignore.
    // We ignore build output, config files, and dependency folders.
    ignorePatterns: [
        'dist/',
        'dev-dist/',
        'eslint.config.js',
        '.eslintrc.cjs',
        'node_modules/',
        '.turbo/',
        'coverage/',
    ],

    // The parser allows ESLint to understand TypeScript code. By default, ESLint only understands JavaScript.
    parser: '@typescript-eslint/parser',

    // Configuration for the parser.
    parserOptions: {
        // This tells ESLint to use type information from TypeScript, enabling more powerful rules.
        // It uses a dedicated tsconfig file for linting purposes.
        project: './config/tsconfig.eslint.json',
        // Specifies the root directory for resolving the tsconfig file path.
        tsconfigRootDir: __dirname,
        // Specifies the version of ECMAScript syntax you are using.
        ecmaVersion: 2022,
        // Allows for the use of `import`/`export` syntax.
        sourceType: 'module',
    },

    // Defines the environments your code will run in.
    // Each environment brings a certain set of predefined global variables.
    env: {
        browser: true, // For browser global variables like `window` and `document`.
        node: true, // For Node.js global variables and scoping, like `process`.
        es2022: true, // Enables ES2022 globals and syntax.
    },

    // Defines custom global variables that are available in your project.
    // This is where you tell ESLint about globals from your testing framework (Vitest).
    globals: {
        vi: 'readonly', // Vitest's replacement for Jest's `jest`.
        describe: 'readonly', // Test suite function.
        it: 'readonly', // Test case function.
        expect: 'readonly', // Assertion function.
    },

    // Plugins add new rules and capabilities to ESLint.
    plugins: [
        'react', // For React-specific rules.
        'react-hooks', // For enforcing the Rules of Hooks.
        'react-refresh', // For rules related to React Fast Refresh (HMR).
        'import', // For rules related to ES6+ `import`/`export` syntax.
        '@typescript-eslint', // For TypeScript-specific rules.
    ],

    // `extends` applies a pre-defined set of rules from configurations.
    // The order is important: each new config can override rules from the previous ones.
    extends: [
        'eslint:recommended', // ESLint's built-in recommended rules.
        'plugin:react/recommended', // Recommended rules from eslint-plugin-react.
        'plugin:react/jsx-runtime', // Disables the need to `import React from 'react'` in every file.
        'plugin:@typescript-eslint/recommended', // Recommended rules from the TypeScript ESLint plugin.
        'plugin:import/recommended', // Recommended rules for import/export syntax.
        'plugin:import/typescript', // Adds TypeScript support to the import plugin.
        'plugin:react-hooks/recommended', // Recommended rules for React Hooks.
        'prettier', // **CRITICAL**: This turns off all ESLint stylistic rules that could conflict with Prettier. It must be the last item.
    ],

    // `settings` provides shared configuration for all rules from certain plugins.
    settings: {
        react: {
            // Automatically detects the React version to use.
            version: 'detect',
        },
        // Helps the `import` plugin resolve module paths correctly, especially with TypeScript.
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true, // Searches for `@types` packages.
                project: './config/tsconfig.eslint.json',
            },
            node: true,
        },
    },

    // `rules` is where you customize or override the rules from the `extends` configurations.
    // This is where your organization defines its specific code quality standards.
    rules: {
        // --- React Rules ---
        'react/prop-types': 'off', // Not needed since we use TypeScript for type checking props.
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // Ensures React Fast Refresh works correctly by only exporting components.

        // --- TypeScript Rules ---
        '@typescript-eslint/no-explicit-any': 'error', // Disallows using the `any` type, forcing you to be more explicit.
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Flags unused variables, but allows unused function arguments that start with an underscore (`_`).
        '@typescript-eslint/consistent-type-imports': 'error', // Enforces using `import type { ... }` for type-only imports.
        '@typescript-eslint/prefer-nullish-coalescing': 'error', // Suggests using `??` instead of `||` when appropriate.
        '@typescript-eslint/prefer-optional-chain': 'error', // Suggests using `?.` for safer nested property access.
        '@typescript-eslint/no-floating-promises': 'error', // Requires you to handle Promises properly (e.g., with `await` or `.catch()`).
        '@typescript-eslint/await-thenable': 'error', // Prevents awaiting a value that is not a `Thenable` (like a Promise).
        '@typescript-eslint/no-unnecessary-condition': 'error', // Flags `if` statements where the condition will always be true or false.
        '@typescript-eslint/no-unnecessary-type-arguments': 'error', // Warns about providing explicit type arguments when they can be inferred.

        // --- Import Rules ---
        'import/extensions': [
            // This rule is controversial but enforces consistency. It requires you to include file extensions in your import paths.
            'error',
            'ignorePackages', // Don't require extensions for packages like 'react' or 'lodash'.
            {
                ts: 'always',
                tsx: 'always',
                scss: 'always',
                css: 'always',
                json: 'always',
                svg: 'always',
                png: 'always',
            },
        ],
    },
};
