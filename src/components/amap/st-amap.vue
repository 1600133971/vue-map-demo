<template>
  <div :id="id" class="st-map">正在加载数据 ...</div>
</template>

<style lang="css">
.st-map {
  width: 100%;
  height: 100%;
}
</style>

<script>
import amapBase from "./st-amap-base.js";
export default {
  extends: amapBase,
  props: ["tb", "scale", "overview", "maptype"],
  data() {
    return {
      toolbarFlag: this.tb.split(":")[0],
      toolbatType: this.tb.split(":")[1]
    };
  },
  methods: {
    initMap() {
      let pluginList = [];
      if (this.tb && this.toolbarFlag === "on") {
        pluginList.push("AMap.ToolBar");
      }
      if (this.scale && this.scale === "on") {
        pluginList.push("AMap.Scale");
      }
      if (this.overview && this.overview === "on") {
        pluginList.push("AMap.OverView");
      }

      if (this.maptype && this.maptype === "on") {
        pluginList.push("AMap.MapType");
      }

      this.AMap.plugin(pluginList, () => {
        if (this.tb && this.toolbarFlag === "on") {
          this.map.addControl(
            new this.AMap.ToolBar({ position: this.toolbatType || "LT" })
          );
        }

        if (this.scale && this.scale === "on") {
          this.map.addControl(new this.AMap.Scale());
        }

        if (this.overview && this.overview === "on") {
          this.map.addControl(new this.AMap.OverView({ isOpen: true }));
        }

        if (this.maptype && this.maptype === "on") {
          this.map.addControl(new this.AMap.MapType());
        }
      });
    }
  }
};
</script>
