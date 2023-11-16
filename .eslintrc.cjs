// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],

  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@next/next/no-img-element': 0,
    'react/display-name': 0,

    '@typescript-eslint/no-unused-vars': 1,
    'jsx-no-newline-after-jsx-whitespace': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    // "print-width": 400,
    // "@typescript-eslint/no-useless-empty-export": 0,
    'max-len': [1, { code: 180 }],
    'react/react-in-jsx-scope': 'off',
    // "react/prop-types": "off",
  },
};
