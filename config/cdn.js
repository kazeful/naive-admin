const process = require('node:process')

const jsConfig = []
const externalConfig = []

if (process.env.NODE_ENV === 'production') {
  jsConfig.push(...[
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.3/vue-router.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vuex/3.6.2/vuex.min.js',
  ])
  externalConfig.push(...[
    {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
    },
  ])
}

module.exports = { jsConfig, externalConfig }
