<template>
  <div class="amap-rectangle-container">
    <el-amap vid="amap-rectangle" :zoom="zoom" :center="center" class="amap-rectangle">
      <el-amap-rectangle
        v-for="(retangle, index) in retangles"
        :events="retangle.events"
        :center="retangle.center"
        :bounds="retangle.bounds"
        :fill-color="retangle.fillColor"
        :fill-opacity="retangle.fillOpacity"
        :key="index"></el-amap-rectangle>
    </el-amap>
  </div>
</template>

<style>
.amap-rectangle-container {
  height: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      zoom: 12,
      center: [121.5273285, 31.21515044],
      retangles: [
        {
          center: [121.5273285, 31.21515044],
          bounds: [[121.5273285, 31.21515044], [121.7276285, 31.24545044]],
          fillOpacity: 0.7,
          fillColor: "#ffffff",
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
