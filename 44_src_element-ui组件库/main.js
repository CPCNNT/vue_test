import Vue from 'vue'
import App from './App.vue'

// 完整引入
// import ElementUI from 'element-ui'  // 引入 ElementUI 组件库
// import 'element-ui/lib/theme-chalk/index.css'  // 引入 ElementUI 全部样式

// 按需引入
import { Button, Row, DatePicker } from 'element-ui'

Vue.config.productionTip = false

// Vue.use(ElementUI)  // 应用 ElementUI

Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(DatePicker.name, DatePicker)

new Vue({
  el: '#app',
  render: h => h(App),
})
