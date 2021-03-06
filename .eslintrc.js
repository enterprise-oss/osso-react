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
    'prettier',
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'sort-imports': 'off',
    'import/order': 'off',
    'no-unused-vars': 'off',
    'simple-import-sort/imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
};
