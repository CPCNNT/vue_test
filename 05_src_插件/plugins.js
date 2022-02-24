export default {
  install(Vue) {
    // 全局过滤器
    Vue.filter('mySlice', function (val) {
      return val.slice(0,4)      
    })

    // 全局自定义指令
    Vue.directive('fbind', {
      // 指令与元素成功绑定时（初始化时）
      'bind': function (element, binding) {
        element.value = binding.value
      },
      // 指令所在元素被插入页面时
      'inserted': function (element, binding) {
        element.focus()
      },
      // 指令所在的模板被重新解析时
      'update': function (element, binding) {
        element.value = binding.value
      }
    })

    // 配置全局mixin
    Vue.mixin({
      data() {
        return {
          x: 100,
          y: 200
        }
      }
    })

    // 给Vue原型上添加一个方法，vm与vc就都能用了
    Vue.prototype.hello = () => {alert('你好啊！')}
  }
}
