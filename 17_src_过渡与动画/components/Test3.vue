<template>
  <div>
    <button v-on:click="show = !show">显示/隐藏</button>
    <transition-group 
      appear
      name="animate__animated animate__bounce" 
      enter-active-class="animate__jello"
      leave-active-class="animate__backOutUp"
    >
      <h1 v-show="show" key="1">你好啊！</h1>
      <h1 v-show="!show" key="2">Peng Cao！</h1>
    </transition-group>
  </div>
</template>

<script>
  import 'animate.css'

  export default {
    name: 'Test',
    data() {
      return {
        show: true
      }
    },
  }
</script>

<style scoped>
  h1 {
    background-color: orange;
  }
</style>
