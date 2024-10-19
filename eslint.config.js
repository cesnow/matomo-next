const js = require('@eslint/js')
const airbnb = require('eslint-config-airbnb')
const airbnbTypescript = require('eslint-config-airbnb-typescript')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const prettier = require('eslint-plugin-prettier')
const importEslint = require('eslint-plugin-import')

module.exports = [
  importEslint.flatConfigs.react,
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    rules: {
      ...js.configs.react,
      // ...airbnb.rules,
      // ...airbnbTypescript.rules,
      // ...typescriptEslint.configs['recommended'].rules,
      // ...typescriptEslint.configs['recommended-requiring-type-checking'].rules,
    },
  },
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    rules: {
      'no-console': 'off',
      'func-names': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/require-default-props': 'off',
      'react/prop-types': 'off',
      'no-underscore-dangle': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
]
