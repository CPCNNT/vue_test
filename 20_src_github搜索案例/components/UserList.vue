<template>
  <div class="row">
    <!-- 展示用户列表 -->
    <div
      class="card"
      v-show="userData.users.length"
      v-for="user in userData.users"
      v-bind:key="user.id"
    >
      <a v-bind:href="user.html_url" target="_blank">
        <img v-bind:src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{ user.login }}</p>
    </div>
    <!-- 展示欢迎词 -->
    <h2 v-show="userData.isFirst">Welcome, bro!</h2>
    <!-- 展示加载中 -->
    <h2 v-show="userData.isLoading">Loading...</h2>
    <!-- 展示错误信息 -->
    <h2 v-show="userData.errMsg">{{ userData.errMsg }}</h2>
  </div>
</template>

<script>
  export default {
    name: "UserList",
    data() {
      return {
        userData: {
          isFirst: true,
          isLoading: false,
          errMsg: "",
          users: [],
        },
      };
    },
    mounted() {
      this.$bus.$on("transferUserData", (dataObj) => {
        this.userData = { ...this.userData, ...dataObj };
      });
    },
  };
</script>

<style>
  .album {
    min-height: 50rem; /* Can be removed; just added for demo purposes */
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: #f7f7f7;
  }

  .card {
    float: left;
    width: 33.333%;
    padding: 0.75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: 0.75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
</style>