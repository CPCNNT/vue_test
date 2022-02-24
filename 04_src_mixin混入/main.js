import Vue from 'vue'
import App from './App.vue'

// 引入mixin
import { mixin, mixin2 } from './mixin'

// 配置全局mixin
Vue.mixin(mixin)
Vue.mixin(mixin2)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
