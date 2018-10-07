<template>
    <div class="amap-circle-marker-container">
      <el-amap vid="amap-circle-marker" :zoom="zoom" :center="center" class="amap-circle-marker">
        <el-amap-circle-marker
          v-for="(marker, index) in markers"
          :center="marker.center"
          :radius="marker.radius"
          :fill-color="marker.fillColor"
          :fill-opacity="marker.fillOpacity"
          :events="marker.events"
          :key="index">
        </el-amap-circle-marker>
      </el-amap>
    </div>
</template>

<style>
.amap-circle-marker-container {
  height: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      zoom: 12,
      center: [121.5273285, 31.21515044],
      markers: [
        {
          center: [121.5273285, 31.21515044],
          radius: 20,
          fillOpacity: 1,
          fillColor: "rgba(0,0,255,1)",
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
