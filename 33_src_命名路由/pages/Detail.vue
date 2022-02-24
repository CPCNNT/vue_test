<template>
  <ul>
    <li>消息编号：{{ msgId }}</li>
    <li>消息标题：{{ msgTitle }}</li>
  </ul>
</template>

<script>
  export default {
    name: 'Detail',
    computed: {
      msgId() {
        return this.$route.query.id
      },
      msgTitle() {
        return this.$route.query.title
      },
    }
  }
</script>

<style>

</style>