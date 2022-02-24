<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ gender }}</h2>
    <h2>学生年龄：{{ myAge }}</h2>
    <button v-on:click="updateAge">点我修改收到的年龄</button>
  </div>
</template>

<script>
  export default {
    name: "Student",
    data() {
      return {
        msg: '我在B站自学尚硅谷的Vue教程',
        myAge: this.age
      }
    },
    methods: {
      updateAge() {
        this.myAge++
      }
    },
    // 简单接收
    props: ['name', 'gender', 'age']

    // 接收的同时对数据类型进行限制
    // props: {
    //   name: String,
    //   gender: String,
    //   age: Number
    // }

    // 接收的同时对数据进行：类型限制+默认值的制定+必要性的限制
    // props: {
    //   name: {
    //     type: String,  // name的类型是字符串
    //     required: true  // name是必要的
    //   },
    //   gender: {
    //     type: String,
    //     required: true
    //   },
    //   age: {
    //     type: Number,
    //     default: 18  // 默认值
    //   }
    // }
  }
</script>

<style scoped></style>
