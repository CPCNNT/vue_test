<template>
  <div class="app">
    <h1>{{ msg }}，学生姓名是：{{ studentName }}</h1>
    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School v-bind:getSchoolName="getSchoolName"/>

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第一种写法：使用@或者v-on) -->
    <!-- <Student v-on:atguigu="getStudentName" v-on:demo="m1"/> -->

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第二种写法：使用ref) -->
    <Student ref="student" v-on:click.native="show"/>
  </div>
</template>

<script>
  import School from './components/School.vue'
  import Student from './components/Student.vue'

  export default {
    name: "App",
    components: {School, Student},
    data() {
      return {
        msg: '你好啊',
        studentName: ''
      }
    },
    methods: {
      getSchoolName(name) {
        console.log('App 收到了学校名：', name)
      },
      getStudentName(name, ...params) {
        console.log('App 收到了学生名：', name, params)
        this.studentName = name
      },
      m1() {
        console.log('demo被调用了')
      },
      show() {
        alert('组件身上也可以绑定原生 DOM 事件，但得添加 .native 修饰！')
      }
    },
    mounted() {
      this.$refs.student.$on('atguigu', this.getStudentName)  // 绑定自定义事件
      // this.$refs.student.$once('atguigu', this.getStudentName)  // 只触发一次
    }
  }
</script>

<style>
  .app {
    background-color: grey;
    padding: 5px;
  }
</style>
