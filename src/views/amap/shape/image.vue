<template>
  <div class="amap-page-container">
    <el-amap vid="amap-image" :zoom="zoom" :center="center" class="amap-image">
      <el-amap-ground-image v-for="(groundimage, index) in groundimages" :url="groundimage.url" :bounds="groundimage.bounds" :events="groundimage.events" :key="index"></el-amap-ground-image>
    </el-amap>
  </div>
</template>

<style>
.amap-image {
  height: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      zoom: 7,
      center: [121.5273285, 31.21515044],
      groundimages: [
        {
          url: "//faas.elemecdn.com/desktop/media/img/appqc.95e532.png",
          bounds: [[121.5273285, 31.21515044], [122.9273285, 32.31515044]],
          events: {
            click() {
              alert("click groundimage");
            }
          }
        }
      ]
    };
  }
};
</script>
