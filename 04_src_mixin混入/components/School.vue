<template>
  <div>
    <h2 v-on:click="showName">学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
  // 引入mixin
  // import {mixin, mixin2} from '../mixin.js'

  export default {
    name: "School",
    data() {
      return {
        name: '尚硅谷',
        address: '上海',
        x: 666
      }
    },
    // mixins: [mixin, mixin2]
  }
</script>

<style scoped></style>
