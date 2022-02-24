<template>
  <!-- <transition name="todo" appear> -->
    <li>
      <label>
        <input
          type="checkbox"
          :checked="todo.done"
          v-on:change="handleCheck(todo.id)"
        />
        <!-- 下一行代码也能实现上一行的功能，但是不推荐，因为违反原则，修改了 props -->
        <!-- <input type="checkbox" v-model="todo.done"/> -->
        <span v-show="!todo.isBeingEdited" v-text="todo.title"></span>
        <input
          type="text"
          v-show="todo.isBeingEdited"
          v-bind:value="todo.title"
          v-on:blur="handleBlur(todo, $event)"
          ref="editTitle"
        />
      </label>
      <div class="btns">
        <button
          class="btn btn-edit"
          v-on:click="handleEdit(todo)"
          v-show="!todo.isBeingEdited"
        >
          编辑
        </button>
        <button class="btn btn-danger" v-on:click="handleDel(todo.id)">
          删除
        </button>
      </div>
    </li>
  <!-- </transition> -->
</template>

<script>
export default {
  name: "Item",
  // 声明接受todo对象
  props: ["todo"],
  methods: {
    handleCheck(id) {
      //
      this.$bus.$emit("checkTodo", id);
    },
    handleDel(id) {
      //
      if (confirm("确认删除该项吗？")) this.$bus.$emit("delTodo", id);
    },
    // 编辑
    handleEdit(todo) {
      if (todo.hasOwnProperty("isBeingEdited")) {
        todo.isBeingEdited = true;
      } else {
        this.$set(todo, "isBeingEdited", true);
      }
      this.$nextTick(() => {
        this.$refs.editTitle.focus();
      });
    },
    // 失去焦点时的回调（真正修改逻辑）
    handleBlur(todo, e) {
      todo.isBeingEdited = false;
      if (!e.target.value.trim()) return alert("输入值不能为空！");
      this.$bus.$emit("updateTodoTitle", todo.id, e.target.value.trim());
    },
  },
};
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

.btns {
  float: right;
  display: flex;
  flex-direction: row;
  margin-top: 3px;
}

li button {
  display: none;
  margin-right: 8px;
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
 
/* 进入的起点 */
.todo-enter {
  transform: translateX(100%);
}

.todo-enter-active,
.todo-leave-active {
  transition: 0.5s;
}

/* 进入的终点，离开的起点 */
.todo-enter-to,
.todo-leave {
  transform: translateX(0);
}

/* 离开的终点 */
.todo-leave-to {
  transform: translateX(-100%);
}
</style>
