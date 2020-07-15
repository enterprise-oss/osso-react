module.exports = {
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['src/**/*.tsx?'],
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/sort': 'error',
  },
};
