<template>
  <el-container>
    <div :id="id" class="st-map-azimuth">正在加载数据 ...</div>
  </el-container>
</template>

<style lang="css">
.st-map-azimuth {
  width: 800px;
  height: 800px;
  position: absolute;
}
</style>

<script>
import amapBase from "./st-amap-base.js";
export default {
  extends: amapBase,
  data() {
    return {
      hbwdAngle: 60,
      path: [[null], [null], [null], [null]],
      pointList: [
        [121.59996, 31.197646],
        [121.61996, 31.217646],
        [121.63996, 31.237646],
        [121.57996, 31.237646]
      ],
      starCenter: [this.lng, this.lat],
      azimuthAngleList: [
        [0, 120, 240],
        [60, 180, 300],
        [30, 150, 240],
        [30, 150, 240]
      ],
      radius: 30,
      colorList: [
        ["red", "blue", "green"],
        ["blue", "red", "yellow"],
        ["red", "blue", "orange"],
        ["red", "blue", "orange"]
      ]
    };
  },
  methods: {
    initMap() {
      this.map.plugin(["AMap.CustomLayer"], this.addCustomLayer);
    },
    addCustomLayer() {
      let xmlns = "http://www.w3.org/2000/svg";
      let size = this.map.getSize();
      let svg = document.createElementNS(xmlns, "svg");
      svg.setAttribute("width", size.width);
      svg.setAttribute("height", size.height);
      svg.setAttribute("viewBox", "0 0 " + size.width + " " + size.height);

      for (var j = 0; j < this.pointList.length; j++) {
        for (var i = 0; i < this.azimuthAngleList[j].length; i++) {
          let p = document.createElementNS(xmlns, "path");
          p.onclick = function() {
            console.log("svg path clicked");
          };
          let styleText = [];
          styleText.push("fill:" + this.colorList[j][i]);
          styleText.push("fill-opacity:0.5");
          p.style.cssText = styleText.join(";");

          svg.appendChild(p);
          this.$set(this.path[j], i, p);
        }
      }

      let customLayer = new this.AMap.CustomLayer(svg, {
        zooms: [3, 18],
        alwaysRender: true,
        zIndex: 300
      });
      customLayer.render = this.onRender;
      this.map.add(customLayer);
    },
    onRender() {
      let angleToRadian = angle => {
        return (angle * Math.PI) / 180;
      };

      let currentRadius = (this.radius * (this.map.getZoom() - 3)) / 12;

      for (var j = 0; j < this.pointList.length; j++) {
        let center = this.map.lngLatToContainer(this.pointList[j]);

        for (var i = 0; i < this.azimuthAngleList[j].length; i++) {
          var starttangle = angleToRadian(
            this.azimuthAngleList[j][i] - this.hbwdAngle / 2
          );
          var endangle = angleToRadian(
            this.azimuthAngleList[j][i] + this.hbwdAngle / 2
          );

          //计算出楔和园相交的两个点
          //这些计算公式都是以12点钟方向为0°,顺时针方向角度递增
          var x1 = center.x + currentRadius * Math.sin(starttangle);
          var y1 = center.y - currentRadius * Math.cos(starttangle);
          var x2 = center.x + currentRadius * Math.sin(endangle);
          var y2 = center.y - currentRadius * Math.cos(endangle);

          //这个标记表示角度大于半圆,此标记在绘制SBG弧形组件的时候需要
          var big = endangle - starttangle > Math.PI ? 1 : 0;

          //下面的字符串包含路径的详细信息
          var d =
            "M " +
            center.x +
            "," +
            center.y + //从圆心开始
            " L " +
            x1 +
            "," +
            y1 + //画一条到(x1,y1)的线段
            " A " +
            currentRadius +
            "," +
            currentRadius + //再画一条半径为r的弧
            " 0 " +
            big +
            " 1 " + // 弧的详细信息
            x2 +
            "," +
            y2 + //弧到(x2,y2)结束
            " Z"; //d当前路径到(cx,cy)结束

          this.path[j][i].setAttribute("d", d);
        }
      }
    }
  }
};
</script>
