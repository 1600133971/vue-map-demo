<template>
  <el-container>
    <div :id="id" class="st-map-simple-marker">正在加载数据 ...</div>
  </el-container>
</template>

<style lang="css">
.st-map-simple-marker {
  width: 700px;
  height: 500px;
  position: absolute;
}
</style>

<script>
import amapBase from "./st-amap-base.js";
export default {
  extends: amapBase,
  methods: {
    initMap() {
      this.AMapUI.loadUI(["overlay/SimpleMarker"], SimpleMarker => {
        const marker = new SimpleMarker({
          iconLabel: "A",
          iconStyle: "red",
          map: this.map,
          position: [this.lng, this.lat]
        });
      });
    }
  }
};
</script>
