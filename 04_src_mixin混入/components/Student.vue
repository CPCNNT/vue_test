<template>
  <div>
    <h2 v-on:click="showName">学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ gender }}</h2>
  </div>
</template>

<script>
  // 引入mixin
  // import {mixin, mixin2} from '../mixin.js'

  export default {
    name: "Student",
    data() {
      return {
        name: 'Peng Cao',
        gender: '男'
      }
    },
    // mixins: [mixin, mixin2]
  }
</script>

<style scoped></style>
