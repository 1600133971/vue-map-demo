<template>
  <div class="amap-circle-container">
    <el-amap vid="amap-circle" :zoom="zoom" :center="center" class="amap-circle">
      <el-amap-circle v-for="(circle, index) in circles" :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity" :events="circle.events" :key="index"></el-amap-circle>
    </el-amap>
  </div>
</template>

<style>
.amap-circle-container {
  height: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      circles: [
        {
          center: [121.5273285, 31.21515044],
          radius: 200,
          fillOpacity: 0.5,
          events: {
            click: () => {
              alert("click");
            }
          }
        }
      ]
    };
  }
};
</script>
