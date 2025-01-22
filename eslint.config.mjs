import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules/*',
      'coverage',
      '.husky/*',
      '**/cypress/support',
      '**/cypress/downloads',
      '.stylelintrc.json',
      'package-lock.json',
      'package.json',
      'tsconfig.app.json',
      'tsconfig.build.json',
      'tsconfig.json',
      'tsconfig.node.json',
      '**/.next/*',
      '**/cypress.config.ts',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  eslintConfigPrettier,
);
