<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
      <!-- 下一行代码也能实现上一行的功能，但是不推荐，因为违反原则，修改了 props -->
      <!-- <input type="checkbox" v-model="todo.done"/> -->
      <span v-text="todo.title"></span>
    </label>
    <button class="btn btn-danger" @click="handleDel(todo.id)">删除</button>
  </li>
</template>

<script>
  export default {
    name: 'Item',
    // 声明接受todo对象
    props: ['todo', 'checkTodo', 'delTodo'],
    methods: {
      handleCheck(id) {
        // 通知App组件将对应的todo的done属性取反
        this.checkTodo(id)
      },
      handleDel(id) { 
        // 通知App组件将对应id的todo项删除
        if (confirm('确认删除该项吗？')) this.delTodo(id)
      }
    },
  }
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }

  li:hover {
    background-color: lightgrey;
  }

  li:hover button {
    display: block;
  }
</style>
