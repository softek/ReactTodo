module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules:{
    'linebreak-style': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
  },
  overrides: [
    {
      files: [
        '**/*.stories.*',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
}
