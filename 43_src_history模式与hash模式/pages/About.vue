<template>
  <h2>我是About的内容</h2>
</template>

<script>
  export default {
    name: 'About',
    // 通过路由规则，进入该组件时
    beforeRouteEnter (to, from, next) {
      console.log('组件内路由守卫', to, from)
      if (to.meta.isAuth) {  // 判断是否需要鉴定权限
        if (localStorage.getItem('school') === 'atguigu') {
          next()
        } else {
          alert('学校名不正确，无权限查看！')
        }
      } else {
        next()
      }
    },
    // 通过路由规则，离开该组件时
    beforeRouteLeave (to, from, next) {
      next()
    }
  }
</script>

<style></style>
