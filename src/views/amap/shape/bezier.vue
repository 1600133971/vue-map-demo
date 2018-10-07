<template>
  <div class="amap-bezier-container">
    <el-amap vid="amap-bezier" :zoom="zoom" :center="center" class="amap-bezier">
      <el-amap-bezier-curve
        v-for="(line, index) in lines"
        :events="line.events"
        :path="line.path"
        :stroke-color="line.strokeColor"
        :stroke-style="line.strokeStyle"
        :stroke-opacity="line.strokeOpacity"
        :key="index"></el-amap-bezier-curve>
    </el-amap>
  </div>
</template>

<style>
.amap-bezier-container {
  height: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      zoom: 12,
      center: [116.380298, 39.907771],
      lines: [
        {
          path: [
            [116.39, 39.91, 116.37, 39.91],
            [116.380298, 39.907771, 116.38, 39.9],
            [116.385298, 39.907771, 116.4, 39.9]
          ],
          strokeDasharray: [10, 10],
          strokeColor: "#FF33FF", //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 3, //线宽
          strokeStyle: "solid", //线样式
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
