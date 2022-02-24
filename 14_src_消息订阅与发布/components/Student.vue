<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ gender }}</h2>
    <button v-on:click="sendStudentName">点我把学生姓名发给School组件</button>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js'

  export default {
    name: "Student",
    data() {
      return {
        name: "Peng Cao",
        gender: "男"
      }
    },
    methods: {
      sendStudentName() {
        // 发布消息
        pubsub.publish('transferStudentName', this.name)
      }
    }
  }
</script>

<style scoped>
  .student {
    background-color: pink;
    padding: 5px;
    margin-top: 30px;
  }
</style>
