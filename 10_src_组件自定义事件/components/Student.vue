<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ gender }}</h2>
    <h2>当前求和为：{{ num }}</h2>
    <button v-on:click="add">点我 num++</button>
    <button v-on:click="sendStudentName">点我把学生名给 App</button>
    <button v-on:click="unbind">解绑atguigu事件</button>
    <button v-on:click="death">销毁当前Student组件的实例</button>
  </div>
</template>

<script>
  export default {
    name: "Student",
    data() {
      return {
        name: "Peng Cao",
        gender: "男",
        num: 0
      };
    },
    methods: {
      add() {
        console.log('add回调被调用了')
        this.num++
      },
      sendStudentName() {
        // 触发Student组件实例身上的atguigu事件
        this.$emit('atguigu', this.name, 6, 7, 8, 9)
        // this.$emit('demo')
      },
      unbind() {
        this.$off('atguigu')  // 解绑一个自定义事件
        // this.$off(['atguigu', 'demo'])  // 解绑多个自定义事件
        // this.$off()  // 解绑所有自定义事件
      },
      death() {
        this.$destroy()  // 销毁了当前Student组件的实例，销毁后所有Student实例的自定义事件全都不奏效了
      }
    }
  }
</script>

<style scoped>
  .student {
    background-color: pink;
    padding: 5px;
    margin-top: 30px;
  }
</style>
