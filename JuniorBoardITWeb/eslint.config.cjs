const tseslint = require('typescript-eslint');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');
const pluginImport = require('eslint-plugin-import');
// const pluginFunctional = require('eslint-plugin-functional');
const pluginPrettier = require('eslint-plugin-prettier');
const pluginHtml = require('eslint-plugin-html');
const pluginJsonc = require('eslint-plugin-jsonc');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat();
const eslint = require('@eslint/js');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      import: pluginImport,
      // functional: pluginFunctional,
      prettier: pluginPrettier
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],
      'no-console': 'error',
      'import/first': 'warn',
      'import/no-unresolved': 'error',
      'import/no-self-import': 'error',
      'import/order': [
        'warn',
        {
          alphabetize: {
            order: 'asc'
          },
          groups: [['external', 'builtin'], 'internal', ['sibling', 'parent'], 'index', 'object', 'unknown'],
          pathGroups: [{ pattern: 'src/**', group: 'internal', position: 'before' }],
          pathGroupsExcludedImportTypes: ['internal'],
          'newlines-between': 'always'
        }
      ],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      // '@typescript-eslint/no-unsafe-memeber-access': 'warn',
      // '@typescript-eslint/no-unsafe-call': 'warn',
      // '@typescript-eslint/no-unsafe-argument': 'warn',
      // '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    plugins: {
      '@angular-eslint/template': angularTemplate,
      html: pluginHtml
    },
    rules: {
      '@angular-eslint/template/no-negated-async': 'warn',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/no-inline-styles': 'warn'
    }
  },
  {
    files: ['**/*.json'],
    plugins: {
      jsonc: pluginJsonc
    },
    languageOptions: {
      parser: pluginJsonc.parser
    },
    rules: {
      'jsonc/array-bracket-spacing': ['error', 'never'],
      'jsonc/object-curly-spacing': ['error', 'always']
    }
  },
  ...compat.extends('plugin:prettier/recommended')
);
