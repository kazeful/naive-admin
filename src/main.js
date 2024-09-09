import components from '@/components'
import directives from '@/directives'
import ElementUI from 'element-ui'
import Vue from 'vue'
import VxeTable from 'vxe-table'

import App from './App'
import router from './router'
import store from './store'

import '@/styles/element-variables.scss'
import 'vxe-table/lib/style.css'
import 'windi.css'
import '@/styles/index.scss'

import '@/assets/icons'
import '@/router/permission'

Vue.use(VxeTable).use(ElementUI).use(components).use(directives)

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
