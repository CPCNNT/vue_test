// 该文件用于创建 Vuex 中最为核心的 store


import Vue from 'vue'
// 引入 Vuex
import Vuex from 'vuex'

// 使用 Vuex 插件
Vue.use(Vuex)

// 准备 actions，用于响应组件中的动作
const actions = {
  // increment(context, value) {
  //   context.commit('INCREMENT', value)
  // },
  // decrement(context, value) {
  //   context.commit('DECREMENT', value)
  // },
  incrementOdd(context, value) {
    if (context.state.sum % 2) {
      context.commit('INCREMENT', value)
    }
  },
  incrementWait(context, value) {
    setTimeout(() => {
      context.commit('INCREMENT', value)
    }, 500)
  }
}
// 准备 mutations，用于操作数据（state）
const mutations = {
  INCREMENT(state, value) {
    state.sum += value
  },
  DECREMENT(state, value) {
    state.sum -= value
  } 
}
// 准备 state，用于存储数据
const state = {
  sum: 0  // 当前的和
}

// 创建并导出 store
export default new Vuex.Store({
  actions,
  mutations,
  state
})
