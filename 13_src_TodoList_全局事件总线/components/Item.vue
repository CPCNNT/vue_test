<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" v-on:change="handleCheck(todo.id)"/>
      <!-- 下一行代码也能实现上一行的功能，但是不推荐，因为违反原则，修改了 props -->
      <!-- <input type="checkbox" v-model="todo.done"/> -->
      <span v-text="todo.title"></span>
    </label>
    <button class="btn btn-danger" v-on:click="handleDel(todo.id)">删除</button>
  </li>
</template>

<script>
  export default {
    name: 'Item',
    // 声明接受todo对象
    props: ['todo'],
    methods: {
      handleCheck(id) {
        // 
        this.$bus.$emit('checkTodo', id)
      },
      handleDel(id) { 
        // 
        if (confirm('确认删除该项吗？')) this.$bus.$emit('delTodo', id)
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
