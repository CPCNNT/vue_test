<template>
  <div class="school">
    <h2 v-if="studentName">我收到了Student组件发来的学生名：{{ studentName }}</h2>
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js'

  export default {
    name: "School",
    data() {
      return {
        name: '尚硅谷',
        address: '上海',
        studentName: ''
      }
    },
    mounted() {
      // 订阅消息
      this.subId = pubsub.subscribe('transferStudentName', (msgName, data) => {
        this.studentName = data
      })
    },
    beforeDestroy() {
      // 取消订阅
      pubsub.unsubscribe(this.subId)
    },
  }
</script>

<style scoped>
  .school {
    background-color: skyblue;
    padding: 5px;
  }
</style>
