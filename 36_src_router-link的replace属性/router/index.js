// 该文件专门用于创建整个应用的路由器

import VueRouter from 'vue-router'

import About from "../pages/About.vue"
import Home from "../pages/Home.vue"
import News from "../pages/News"
import Message from "../pages/Message"
import Detail from "../pages/Detail"

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
      children: [
        {
          path: 'news',
          component: News,
        },
        {
          path: 'message',
          component: Message,
          children: [
            {
              name: 'det',
              path: 'detail',
              component: Detail,
              // props第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给Detail组件。
              // props: {a:1, b:'hello'}

              // props第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props形式传给Detail组件。
              // props: true

              // props第三种写法，值为函数
              props($route) {
                return { id: $route.query.id, title: $route.query.title }
              }
              // props({query: {id, title}}) {  // 连续解构赋值
              //   return { id, title }
              // }
            }
          ]
        },
      ]
    },
  ]
})
