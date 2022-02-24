// 该文件专门用于创建整个应用的路由器

import VueRouter from 'vue-router'

import About from "../pages/About.vue"
import Home from "../pages/Home.vue"
import News from "../pages/News"
import Message from "../pages/Message"
import Detail from "../pages/Detail"

// 创建并导出一个路由器
const router = new VueRouter({
  routes: [
    {
      name: 'guanyu',
      path: '/about',
      component: About,
      meta: { title: '关于' }
    },
    {
      name: 'zhuye',
      path: '/home',
      component: Home,
      meta: { title: '主页' },
      children: [
        {
          name: 'xinwen',
          path: 'news',
          component: News,
          meta: { isAuth: true, title: '新闻' }
        },
        {
          name: 'xiaoxi',
          path: 'message',
          component: Message,
          meta: { isAuth: true, title: '消息' },
          children: [
            {
              name: 'xiangqing',
              name: 'det',
              path: 'detail',
              component: Detail,
              meta: { isAuth: true, title: '详情' },
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

// 全局前置路由守卫——初始化时以及每次路由切换之前被调用
router.beforeEach((to, from, next) => {
  console.log('前置路由守卫', to, from)
  if (to.meta.isAuth) {  // 判断是否需要鉴定权限
    if (localStorage.getItem('school') === 'atguigu') {
      next()
    } else {
      alert('学校名不正确，无权限查看！')
    }
  } else {
    next()
  }
})

// 全局后置路由守卫——初始化时以及每次路由切换之后被调用
router.afterEach((to, from) => {
  console.log('后置路由守卫', to, from)
  if(to.meta.title) {
    document.title = to.meta.title  // 修改网页的 title
  } else {
    document.title = 'vue_test'
  }
})

export default router
