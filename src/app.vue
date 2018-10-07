<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>

<script>
export default {
  name: "App"
};
</script>
