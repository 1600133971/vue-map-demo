<template>
  <div class="amap-over-view-container">
    <el-amap vid="amap-over-view" :plugin="plugin" class="amap-over-view">
    </el-amap>
  </div>
</template>

<style>
.amap-over-view {
  height: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      plugin: [
        {
          pName: "OverView",
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        }
      ]
    };
  }
};
</script>
