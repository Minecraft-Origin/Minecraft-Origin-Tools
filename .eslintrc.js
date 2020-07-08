module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    './node_modules/@moomfe/hu-cli/.eslintrc.js'
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'vue/script-indent': ['error', 2, {
      baseIndent: 1,
      switchCase: 1
    }]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ]
};
