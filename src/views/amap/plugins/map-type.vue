<template>
  <div class="amap-plugin-map-type-container">
    <el-amap vid="amap-plugin-map-type" :plugin="plugin" class="amap-plugin-map-type">
    </el-amap>
  </div>
</template>

<style>
.amap-plugin-map-type {
  height: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      plugin: [
        {
          pName: "MapType",
          defaultType: 0,
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
