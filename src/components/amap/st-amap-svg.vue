<template>
  <el-container>
    <div :id="id" class="st-map-svg">正在加载数据 ...</div>
  </el-container>
</template>

<style lang="css">
.st-map-svg {
  width: 700px;
  height: 500px;
  position: absolute;
}
</style>

<script>
import amapBase from "./st-amap-base.js";
export default {
  extends: amapBase,
  data() {
    return {
      path: null,
      starCenter: [this.lng, this.lat]
    };
  },
  methods: {
    initMap() {
      this.map.plugin(["AMap.CustomLayer"], this.addCustomLayer);
    },
    addCustomLayer() {
      let size = this.map.getSize();
      let canvas = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      canvas.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      canvas.setAttribute("width", size.width);
      canvas.setAttribute("height", size.height);

      this.path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      this.path.onclick = function() {
        console.log("svg path clicked");
      };
      let styleText = [];
      styleText.push("stroke:red");
      styleText.push("fill:green");
      styleText.push("fill-opacity:0.3");
      this.path.style.cssText = styleText.join(";");

      canvas.appendChild(this.path);
      let customLayer = new this.AMap.CustomLayer(canvas, {
        zooms: [3, 18],
        alwaysRender: true,
        zIndex: 300
      });
      customLayer.render = this.onRender;
      this.map.add(customLayer);
    },
    onRender() {
      let newPath = this.buildPath();
      this.path.setAttribute("d", newPath);
    },
    buildPath() {
      let path = [];
      let center = this.map.lngLatToContainer(this.starCenter);
      for (let k = 0; k < 6; k += 1) {
        let ag = ((Math.PI * 60) / 180) * k;
        let x = center.x + Math.cos(ag) * 50;
        let y = center.y + Math.sin(ag) * 50;
        path.push((k == 0 ? "M" : "L") + x + " " + y);
      }
      return path.join(" ") + " Z";
    }
  }
};
</script>
