import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
// import { cilPlus, cilTrash } from '@coreui/icons'
import store from './store'

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.prototype.$apiAdress = 'http://pengawasan.local'

new Vue({
  el: '#app',
  router,
  store,
  icons,
//   icons: { cilPlus, cilTrash },
  template: '<App/>',
  components: {
    App
  }
})
