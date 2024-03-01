// eslint.config.js
const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    // TypeScript and Vue are auto-detected, you can also explicitly enable them:
    typescript: false,
    vue: {
      vueVersion: 2,
      overrides: {
        'vue/block-order': ['error', {
          order: [['script', 'template'], 'style'],
        }],
        'vue/custom-event-name-casing': ['error', 'kebab-case'],
        'vue/no-unused-refs': 'warn',
        'no-console': 'warn',
      },
    },

    // Disable jsonc and yaml support
    // jsonc: false,
    yaml: false,
    toml: false,
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      'node/prefer-global/process': 'off',
      'unicorn/prefer-node-protocol': 'off',
    },
  },
)
