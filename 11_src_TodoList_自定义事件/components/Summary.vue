<template>
  <div class="todo-footer" v-show="total">
    <label>全选
      <input type="checkbox" v-model="isAll"/>
    </label>
    <span> <span>已完成 {{doneTotal}}</span> / 全部 {{total}} </span>
    <button class="btn btn-danger" @click="handleClearDone">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: "Summary",
    props: ['todos'],
    computed: {
      total() {
        return this.todos.length
      },
      doneTotal() {
        // return this.todos.filter(todo => todo.done === true).length
        // reduce()方法（用于统计）实现
        return this.todos.reduce((pre, current) => pre + (current.done ? 1 : 0), 0)
      },
      isAll: {
        get() {
          return this.doneTotal === this.total && this.total > 0
        },
        set(val) {
          // this.checkAllTodo(val)
          this.$emit('checkAllTodo', val)
        }
      }
    },
    methods: {
      handleClearDone() {
        if (this.todos.filter(todo => todo.done === true).length) {
          // this.clearDone(confirm('确定清除所有已完成任务吗？'))
          this.$emit('clearDone', confirm('确定清除所有已完成任务吗？'))
        } else {
          alert('没有已完成任务！')
        }
      }
    },
  }
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
