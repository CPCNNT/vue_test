// 该文件专门用于创建整个应用的路由器

import VueRouter from 'vue-router'

import About from "../pages/About.vue"
import Home from "../pages/Home.vue"

// 创建并导出一个路由器
export default new VueRouter({
  routes: [
    {
      path: '/about',
      component: About,
    },
    {
      path: '/home',
      component: Home,
    },
  ]
})
