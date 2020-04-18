module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'import/extensions': ['error', 'ignorePackages', { 'ts': 'never' }],
    // 'lines-between-class-members': 'off',
    'max-len': ['error', { 'code': 120 }],
    'no-console': 'off',
    'object-curly-spacing': ['error', 'always'],
    // 'template-curly-spacing': ['error', 'always'],
    '@typescript-eslint/camelcase': 'off',

    /** All rules
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'as-needed'],
      'global-require': 'off',
      'import/prefer-default-export': 'off',
      'import/no-cycle': 'off',
      'camelcase': 'off',
      'no-param-reassign': 'off',
      'no-shadow': 'off',
      'no-await-in-loop': 'off',
      'no-restricted-syntax': 'off',
      'no-undef': 'off',
      'no-loop-func': 'off',
      'no-prototype-builtins': 'off',
      'no-async-promise-executor': 'off',
      'no-underscore-dangle': ['error', { 'allow': ['_id'] }],
      'no-unused-expressions': ['error', { 'allowTaggedTemplates': true }],
      'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
      'no-use-before-define': ['error', { 'variables': false }],
      'object-curly-newline': ['error', {
        'ObjectPattern': { 'multiline': false, 'minProperties': 6 },
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    */

    'import-helpers/order-imports': [
      'warn',
      { // example configuration
          newlinesBetween: 'always',
          groups: [
            'module',
            '/^date-fns/',
            '/controllers/',
            ['/models/', '/interfaces/', '/repositories/', '/services/'],
            '/middlewares/',
            '/config/',
            '/lib/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
}
