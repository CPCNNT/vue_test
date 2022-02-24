<template>
  <div>
    <div class="todo-container">
      <div class="todo-wrap">
        <h1>Your TodoList</h1>
        <Add v-on:addTodo="addTodo"/>
        <List :todos="todos" :checkTodo="checkTodo" :delTodo="delTodo"/>
        <Summary :todos="todos" v-on:checkAllTodo="checkAllTodo" v-on:clearDone="clearDone"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Add from "./components/Add.vue"
  import List from "./components/List.vue"
  import Summary from "./components/Summary.vue"

  export default {
    name: "App",
    components: { Add, List, Summary },
    data() {
      return {
        todos: JSON.parse(localStorage.getItem('todos')) || []
      }
    },
    methods: {
      // 添加一个todo
      addTodo(todoObj) {
        this.todos.unshift(todoObj)
      },
      // 勾选或取消勾选一个todo
      checkTodo(id) {
        this.todos.forEach((todo) => {
          if (todo.id === id) todo.done = !todo.done
        })
      },
      // 全选或取消全选todo列表
      checkAllTodo(done) {
        this.todos.forEach(todo => todo.done = done)
      },
      // 清除已完成任务
      clearDone(cfm) {
        if (cfm) this.todos = this.todos.filter(todo => !todo.done)
      },
      // 删除一个todo项
      delTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
      }
    },
    watch: {
      todos: {
        deep: true,
        handler(value) {
          localStorage.setItem('todos', JSON.stringify(value))
        }
      }
    }
  }
</script>

<style>
  /*base*/
  body {
    background: #fff;
  }

  .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
  }

  .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
  }

  .btn:focus {
    outline: none;
  }

  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .todo-wrap h1 {
    text-align: center;
  }
</style>
