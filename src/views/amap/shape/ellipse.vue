<template>
    <div class="amap-ellipse-container">
      <el-amap vid="amap-ellipse" :zoom="zoom" :center="center" class="amap-ellipse">
        <el-amap-ellipse
          v-for="(ellipse, index) in ellipses"
          :events="ellipse.events"
          :center="ellipse.center"
          :radius="ellipse.radius"
          :key="index">
        </el-amap-ellipse>
      </el-amap>
    </div>
</template>

<style>
.amap-ellipse-container {
  height: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      zoom: 12,
      center: [121.5273285, 31.21515044],
      ellipses: [
        {
          center: [121.5273285, 31.21515044],
          radius: [500, 1000],
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
