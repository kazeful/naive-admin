import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'

import 'windi.css'
import '@/styles/index.scss' // global scss
import '@/assets/icons' // global icons

import App from './App'
import store from './store'
import router from './router'
import '@/router/permission' // permission control

import components from '@/components' // global components
import directives from '@/directives' // global directives
Vue.use(ElementUI).use(components).use(directives)

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('/mock')
  mockXHR() // use MockJs to simulate the API in a production environment
}

function bootstrap() {
  Vue.config.productionTip = false

  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
  })
}

bootstrap()
