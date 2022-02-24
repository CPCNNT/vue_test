<template>
  <div class="container">
    <Category title="美食" v-bind:listData="foods">
      <img src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
    </Category>
    <Category title="游戏" v-bind:listData="games">
      <ul>
        <li v-for="(item, index) in games" v-bind:key="index">{{item}}</li>
      </ul>
    </Category>
    <Category title="电影" v-bind:listData="films">
      <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
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
  .container {
    display: flex;
    justify-content: space-around;
  }

  img {
    width: 100%;
  }

  video {
    width: 100%;
  }
</style>