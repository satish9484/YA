module.exports = {
    root: true,
    ignorePatterns: ['dist/', 'dev-dist/', 'node_modules/', 'coverage/', '.eslintrc.cjs'],

    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './config/tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: false,
    },

    env: {
        browser: true,
        node: true,
        es2022: true,
    },

    globals: {
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        React: 'readonly',
    },

    plugins: ['react', 'react-hooks', 'react-refresh', 'import', '@typescript-eslint'],

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended',
        'prettier',
    ],

    settings: {
        react: {
            version: 'detect',
            runtime: 'automatic',
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
        },
    },

    rules: {
        // React
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

        // TypeScript
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/no-undef': 'off',
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        // Import
        'import/default': 'off',
        'import/extensions': 'off',
    },
};
