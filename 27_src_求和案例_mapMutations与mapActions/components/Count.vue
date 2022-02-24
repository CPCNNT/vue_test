<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h3>当前求和放大10倍为：{{ bigSum }}</h3>
    <h3>我在{{ school }}，学习{{ subject }}</h3>
    <select v-model.number="step">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button v-on:click="increment(step)">+</button>
    <button v-on:click="decrement(step)">-</button>
    <button v-on:click="incrementOdd(step)">当前和为奇数再加</button>
    <button v-on:click="incrementWait(step)">等一等再加</button>
  </div>
</template>

<script>
  // 导入 mapState，mapGetters
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'Count',
    data() {
      return {
        step: 1
      }
    },
    computed: {
      // 借助 mapState 生成计算属性，从 state 中读取数据。（对象写法）
      // ...mapState({he: 'sum', xuexiao: 'school', xueke: 'subject'})

      // 借助 mapState 生成计算属性，从 state 中读取数据。（数组写法）
      ...mapState(['sum', 'school', 'subject']),

      // 借助 mapGetters 生成计算属性，从 getters 中读取数据。（对象写法）
      // ...mapGetters({bigSum: 'bigSum'})

      // 借助 mapGetters 生成计算属性，从 getters 中读取数据。（数组写法）
      ...mapGetters(['bigSum'])
    },
    methods: {
      // increment() {
      //   this.$store.commit('INCREMENT', this.step)
      // },
      // decrement() {
      //   this.$store.commit('DECREMENT', this.step)
      // },

      // 借助 mapMutations 生成对应的方法，方法中会调用 commit 去联系 mutations （对象写法）
      ...mapMutations({increment: 'INCREMENT', decrement: 'DECREMENT'}),

      // 借助 mapMutations 生成对应的方法，方法中会调用 commit 去联系 mutations （数组写法）
      // ...mapMutations(['INCREMENT', 'DECREMENT']),

      /* ****************************************************************** */
      // incrementOdd() {
      //   this.$store.dispatch('incrementOdd', this.step)
      // },
      // incrementWait() {        
      //   this.$store.dispatch('incrementWait', this.step)        
      // },

      // 借助 mapActions 生成对应的方法，方法中会调用 dispatch 去联系 actions （对象写法）
      // ...mapActions({incrementOdd: 'incrementOdd', incrementWait: 'incrementWait'}),

      // 借助 mapActions 生成对应的方法，方法中会调用 dispatch 去联系 actions （数组写法）
      ...mapActions(['incrementOdd', 'incrementWait']),
    },
    mounted() {
      // const x = mapState({
      //   he: 'sum',
      //   xuexiao: 'school',
      //   xueke: 'subject'
      // })
      // console.log(x)
    },
  }
</script>

<style>
  button {
    margin: 4px;
  }
</style>