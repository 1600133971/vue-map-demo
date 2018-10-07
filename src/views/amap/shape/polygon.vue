<template>
  <div class="amap-polygon-container">
    <el-amap vid="amap" :zoom="zoom" :amap-manager="amapManager" :center="center"
    ref="map"
    class="amap-polygon">
      <el-amap-polygon
        v-for="(polygon,index) in polygons"
        :vid="index"
        :ref="`polygon_${index}`"
        :path="polygon.path"
        :draggable="polygon.draggable"
        :events="polygon.events"
        :key="index">
      </el-amap-polygon>
    </el-amap>
  </div>
</template>

<style>
.amap-polygon {
  height: 300px;
}
</style>

<script>
import amapManager from "@/plugins/amapmanager.js";
export default {
  data() {
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      amapManager: amapManager,
      polygons: [
        {
          draggable: true,
          path: [
            [121.5273285, 31.21515044],
            [121.5293285, 31.21515044],
            [121.5293285, 31.21915044],
            [121.5273285, 31.21515044]
          ],
          events: {
            click: () => {
              alert("click polygon");
              console.log(amapManager.getComponent(0));
              console.log(this.$refs.map.$$getCenter());
              console.log(this.$refs.polygon_0[0].$$getPath());
            }
          }
        }
      ]
    };
  }
};
</script>
