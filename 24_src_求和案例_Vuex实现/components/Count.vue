<template>
  <div>
    <h1>当前求和为：{{ $store.state.sum }}</h1>
    <select v-model.number="step">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button v-on:click="increment">+</button>
    <button v-on:click="decrement">-</button>
    <button v-on:click="incrementOdd">当前和为奇数再加</button>
    <button v-on:click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
  export default {
    name: 'Count',
    data() {
      return {
        step: 1
      }
    },
    methods: {
      increment() {
        this.$store.commit('INCREMENT', this.step)
      },
      decrement() {
        this.$store.commit('DECREMENT', this.step)
      },
      incrementOdd() {
        this.$store.dispatch('incrementOdd', this.step)
      },
      incrementWait() {        
        this.$store.dispatch('incrementWait', this.step)        
      },
    },
    mounted() {
      // console.log(this)
    },
  }
</script>

<style>
  button {
    margin: 4px;
  }
</style>