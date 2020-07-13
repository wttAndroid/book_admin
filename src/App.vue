<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>


<style lang="scss" scoped>
#app {
  position: relative;
  text-align: center;
  color: $font-color;
  height: 100%;
}
</style>
