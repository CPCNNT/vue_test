<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <!-- 定义一个插槽 -->
    <slot name="center">此处可以写一些默认值，当没有具体结构被传过来时，此处的内容会被显示</slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: ['title', 'listData']
  }
</script>

<style>
  .category {
    background-color: skyblue;
    width: 200px;
    height: 300px;
  }

  h3 {
    text-align: center;
    background-color: orange;
  }
</style>