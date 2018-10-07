<template>
  <el-container>
    <div :id="id" class="st-map-canvas">正在加载数据 ...</div>
  </el-container>
</template>

<style lang="css">
.st-map-canvas {
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
      CanvasRenderingContext2D.prototype.sector = function(
        x,
        y,
        r,
        angle1,
        angle2
      ) {
        this.save();
        this.beginPath();
        this.moveTo(x, y);
        this.arc(
          x,
          y,
          r,
          (angle1 * Math.PI) / 180,
          (angle2 * Math.PI) / 180,
          false
        );
        this.closePath();
        this.restore();
        return this;
      };

      let that = this;
      let canvas = document.createElement("canvas");
      canvas.width = this.map.getSize().width;
      canvas.height = this.map.getSize().height;
      let context = canvas.getContext("2d");
      context.globalAlpha = 1;
      context.lineWidth = 2;
      var radious = 50;
      var pixel = that.map.lnglatTocontainer(
        new that.AMap.LngLat(that.lng, that.lat)
      );

      var draw = function(argument) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.globalAlpha = (context.globalAlpha - 0.3 + 1) % 1;
        context.fillStyle = "rgb(255,0,0)";
        context.sector(pixel.getX(), pixel.getY(), radious, 60, 120).fill();
        context.fillStyle = "rgb(0,255,0)";
        context.sector(pixel.getX(), pixel.getY(), radious, 180, 240).fill();
        context.fillStyle = "rgb(0,0,255)";
        context.sector(pixel.getX(), pixel.getY(), radious, 300, 360).fill();
      };

      var CanvasLayer = new this.AMap.CanvasLayer({
        canvas: canvas,
        bounds: this.map.getBounds(),
        zooms: [3, 18]
      });
      CanvasLayer.setMap(this.map);
      draw();
    }
  }
};
</script>
