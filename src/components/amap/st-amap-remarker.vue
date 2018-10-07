<template>
  <el-container>
    <el-main class="main">
      <div :id="id" class="st-map-remarker">正在加载数据 ...</div>
    </el-main>
    <el-aside class="aside">
      <el-button class="button" @click="add()">add marker</el-button>
    </el-aside>
  </el-container>
</template>

<style lang="css">
.st-map-remarker {
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
      let marker = new this.AMap.Marker({
        position: [this.lng, this.lat]
      });
      marker.setMap(this.map);
    },
    add() {
      let marker = new this.AMap.Marker({
        position: [121.59996, 31.177646]
      });

      marker.setMap(this.map);
    }
  }
};
</script>
