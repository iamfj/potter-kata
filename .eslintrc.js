/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  root: true,
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  plugins: ['prettier', 'unused-imports'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: [__dirname + '/tsconfig.json'],
      },
      node: {
        project: [__dirname + '/tsconfig.json'],
      },
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'prettier/prettier': 'error',
    camelcase: 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
    'object-curly-spacing': [2, 'always'],
    quotes: 'off',
    'no-unused-vars': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['.*[t|j]sx?$', '.*[t|j]sx?/.*'],
            message: `Relative imports are not allowed use the '@/' alias instead.`,
          },
        ],
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'always',
        children: 'never',
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'ignore',
      },
    ],
  },
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-use-before-define': [0],
        '@typescript-eslint/no-use-before-define': [1],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/quotes': [
          2,
          'backtick',
          {
            avoidEscape: true,
          },
        ],
      },
    },
  ],
};

module.exports = eslintConfig;
