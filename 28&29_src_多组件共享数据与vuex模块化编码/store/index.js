// 该文件用于创建 Vuex 中最为核心的 store


import Vue from 'vue'
// 引入 Vuex
import Vuex from 'vuex'

import countOptions from './count.js'
import personOptions from './person.js'

// 只有先应用 Vuex 插件，才能 new Vuex.Store()
Vue.use(Vuex)

// 创建并导出 store
export default new Vuex.Store({
  modules: {
    countRelated: countOptions,
    personRelated: personOptions,
  }
})
