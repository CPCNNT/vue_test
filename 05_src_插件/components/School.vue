<template>
  <div>
    <h2>学校名称：{{ name | mySlice }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button v-on:click="testHello">点我测试一下 hello 方法</button>
  </div>
</template>

<script>
  export default {
    name: "School",
    data() {
      return {
        name: '尚硅谷atguigu',
        address: '上海',
      }
    },
    methods: {
      testHello() {
        this.hello()
      }
    },
  }
</script>

<style scoped></style>
