import Vue from 'vue'
import App from './App.vue'

// 引入 store
import store from './store/index.js'

Vue.config.productionTip = false

const vm = new Vue({
  el: '#app',
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})
