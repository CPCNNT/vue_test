<template>
  <div class="school">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
  export default {
    name: "School",
    data() {
      return {
        name: '尚硅谷',
        address: '上海',
      }
    },
    mounted() {
      this.$bus.$on('dataTransferBetweenBrotherComponents', (data) => {
        console.log('我是School组件，收到了Student组件发来的数据', data)
      })
    },
    beforeDestroy() {
      this.$bus.$off('dataTransferBetweenBrotherComponents')
    }
  }
</script>

<style scoped>
  .school {
    background-color: skyblue;
    padding: 5px;
  }
</style>
