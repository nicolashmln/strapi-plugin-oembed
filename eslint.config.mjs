import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import promisePlugin from 'eslint-plugin-promise';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

const flatCompat = new FlatCompat();

export default tseslint.config(
  js.configs.recommended,

  {
    ignores: ['coverage/*', 'dist/*', 'database/migrations/*'],
  },

  /* typescript-eslint */
  ...tseslint.configs.recommended,

  /* eslint-plugin-promise */
  promisePlugin.configs['flat/recommended'],

  /* eslint-plugin-simple-import-sort */
  {
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  /* eslint-plugin-sonarjs */
  sonarjsPlugin.configs.recommended,

  /* eslint-plugin-import */
  ...fixupConfigRules(flatCompat.plugins('import')),
  {
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },

  {
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
    },
  },

  /* eslint-plugin-jest */
  {
    files: ['*.spec.{ts,tsx}'],
    ...jestPlugin.configs['flat/recommended'],
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      /**
       * The `describe` and `it` functions will commonly use the same values.
       * Duplicated strings in this case are acceptable.
       */
      'sonarjs/no-duplicate-string': 0,
    },
  },

  /* eslint-plugin-prettier */
  prettierPlugin
);
