<template>
  <div>
    <Student name="Peng Cao" gender="男" v-bind:age="18"/>
  </div>
</template>

<script>
  import Student from './components/Student.vue'

  export default {
    name: "App",
    components: {Student}
  }
</script>

<style scoped></style>
