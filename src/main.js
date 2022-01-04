import '@babel/polyfill'
import 'core-js/stable'
import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
// import { cilPlus, cilTrash } from '@coreui/icons'
import store from './store'
import 'core-js/stable'; // only stable feature also is possible with only `core-js`
import 'regenerator-runtime/runtime'; // To ensure that regeneratorRuntime is defined globally

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.prototype.$apiAdress = 'http://pengawasan.local'

new Vue({
  el: '#app',
  router,
  store,
  icons,
  vuetify,
//   icons: { cilPlus, cilTrash },
  template: '<App/>',
  components: {
    App
  }
})
