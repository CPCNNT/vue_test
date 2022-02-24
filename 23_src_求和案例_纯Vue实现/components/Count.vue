<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
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
        sum: 0,
        step: 1
      }
    },
    methods: {
      increment() {
        this.sum += this.step
      },
      decrement() {
        this.sum -= this.step
      },
      incrementOdd() {
        if (this.sum % 2) {
          this.sum += this.step
        }
      },
      incrementWait() {
        setTimeout(() => {
          this.sum += this.step
        }, 500)
      },
    },
  }
</script>

<style>
  button {
    margin: 4px;
  }
</style>