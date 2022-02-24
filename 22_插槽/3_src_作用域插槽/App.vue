<template>
  <div class="container">
    <Category title="游戏">
      <template scope="atguigu">
        <!-- {{atguigu.games}} -->
        <ul>
          <li v-for="(item, index) in atguigu.games" v-bind:key="index">{{item}}</li>
        </ul>
      </template>
    </Category>

    <Category title="游戏">
      <template scope="{games}">  <!-- 解构赋值 -->
        <!-- {{atguigu.games}} -->
        <ol>
          <li style="color: red" v-for="(item, index) in games" v-bind:key="index">{{item}}</li>
        </ol>
      </template>
    </Category>

    <Category title="游戏">
      <template slot-scope="{games}">  <!-- 新api -->
        <h4 v-for="(item, index) in games" v-bind:key="index">{{item}}</h4>
      </template>
    </Category>
  </div>
</template>

<script>
  import Category from "./components/Category.vue";

  export default {
    name: "App",
    components: { Category }    
  };
</script>

<style scoped>
  .container, .foot {
    display: flex;
    justify-content: space-around;
  }

  img {
    width: 100%;
  }

  video {
    width: 100%;
  }

  h4 {
    text-align: center;
  }
</style>