import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/socket.io'
import './plugins/element'
import './plugins/fontawesome'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
