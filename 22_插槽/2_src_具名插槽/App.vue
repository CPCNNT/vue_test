<template>
  <div class="container">
    <Category title="美食" v-bind:listData="foods">
      <img slot="center" src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
      <a class="foot" slot="footer" href="http://www.atguigu.com">更多美食</a>
    </Category>

    <Category title="游戏" v-bind:listData="games">
      <ul slot="center">
        <li v-for="(item, index) in games" v-bind:key="index">{{item}}</li>
      </ul>
      <div class="foot" slot="footer">
        <a href="http://www.atguigu.com">单机游戏</a>
        <a href="http://www.atguigu.com">网络游戏</a>
      </div>
    </Category>
    
    <Category title="电影" v-bind:listData="films">
      <video slot="center" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
      <template v-slot:footer>  <!-- v-slot:xxx 为新api -->
        <div class="foot">
          <a href="http://www.atguigu.com">经典</a>
          <a href="http://www.atguigu.com">热门</a>
          <a href="http://www.atguigu.com">推荐</a>
        </div>
        <h4>欢迎前来观影</h4>
      </template>
    </Category>
  </div>
</template>

<script>
  import Category from "./components/Category.vue";

  export default {
    name: "App",
    components: { Category },
    data() {
      return {
        foods: ['龙虾', '烧烤', '炒饭', '酱汁豆腐'],
        games: ['HearthStone', 'Overwatch', 'Heroes of Storm'],
        films: ['Iron Man', 'Passengers', 'Interstellar', 'The Martian']
      }
    },
  };
</script>

<style>
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