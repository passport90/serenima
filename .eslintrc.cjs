module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    '@stylistic',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['**/*.cjs'],
  rules: {
    'camelcase': 'warn',
    'eqeqeq': 'error',
    'no-var': 'error',
    'sort-imports': 'error',
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/indent': ['error', 2],
    '@stylistic/max-len': ['error', { code: 120, tabWidth: 2 }],
    '@stylistic/no-tabs': ['error'],
    '@stylistic/no-trailing-spaces': ['error'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'never'],
  },
};
