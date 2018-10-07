<template>
  <div class="amap-scale-container">
    <el-amap vid="amap-scale" :plugin="plugin" class="amap-scale">
    </el-amap>
  </div>
</template>

<style>
.amap-scale {
  height: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      plugin: [
        {
          pName: "Scale",
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
