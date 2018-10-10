<template>
  <el-container style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;">
    <el-main style="height: 100%;">
      <div :id="id" class="st-map-siteinfo">正在加载数据 ...</div>
    </el-main>
    <el-aside width="400px" style="height: 100%;">
    </el-aside>
  </el-container>
</template>

<style lang="css">
.st-map-siteinfo {
  width: 100%;
  height: 100%;
}
</style>

<script>
import amapBase from "./st-amap-base.js";
export default {
  extends: amapBase,
  data() {
    return {
      hbwdAngle: 60,
      path: [],
      pointList: [
        //[lng, lat, azimuth, hbwd],...
        [121.59996, 31.197646, 0, 65],
        [121.59996, 31.197646, 120, 65],
        [121.59996, 31.197646, 240, 65],

        [121.61996, 31.217646, 60, 65],
        [121.61996, 31.217646, 180, 65],
        [121.61996, 31.217646, 300, 65],

        [121.63996, 31.237646, 30, 65],
        [121.63996, 31.237646, 150, 65],
        [121.63996, 31.237646, 240, 65],

        [121.57996, 31.237646, 30, 65],
        [121.57996, 31.237646, 150, 65],
        [121.57996, 31.237646, 240, 65],

        [121.55996, 31.257646, 0, 65],
        [121.55996, 31.257646, 140, 65],
        [121.55996, 31.257646, 200, 65]
      ],
      starCenter: [this.lng, this.lat],
      radius: 30,
      colorList: [
        "red", //0-30
        "blue", // 30-60
        "green", // 60-90
        "blue", //90-120
        "red", //120-150
        "cyan", // 150-180
        "red", // 180-210
        "blue", // 210-240
        "orange", // 240-270
        "red", // 270-300
        "blue", // 300-330
        "black" // 330-360
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

      let azimuthToColor = azimuth => {
        return this.colorList[Math.floor(azimuth / 30)];
      };

      for (var j = 0; j < this.pointList.length; j++) {
        let p = document.createElementNS(xmlns, "path");
        p.onclick = function() {
          console.log("svg path clicked");
        };
        let styleText = [];
        styleText.push("fill:" + azimuthToColor(this.pointList[j][2]));
        styleText.push("fill-opacity:0.5");
        p.style.cssText = styleText.join(";");

        svg.appendChild(p);
        this.$set(this.path, j, p);
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
      for (var j = 0; j < this.pointList.length; j++) {
        let currentRadius =
          this.map.getZoom() > 10
            ? (this.radius * (this.map.getZoom() - 10)) / 6
            : 1;
        let d = this.computePath(
          this.pointList[j][0],
          this.pointList[j][1],
          currentRadius,
          this.pointList[j][2],
          this.pointList[j][3]
        );
        this.path[j].setAttribute("d", d);
      }
    },
    computePath(lng, lat, radius, azimuth, hbwd) {
      let angleToRadian = angle => {
        return (angle * Math.PI) / 180;
      };
      let center = this.map.lngLatToContainer([lng, lat]);

      var starttangle = angleToRadian(azimuth - hbwd / 2);
      var endangle = angleToRadian(azimuth + hbwd / 2);

      //计算出楔和园相交的两个点
      //这些计算公式都是以12点钟方向为0°,顺时针方向角度递增
      var x1 = center.x + radius * Math.sin(starttangle);
      var y1 = center.y - radius * Math.cos(starttangle);
      var x2 = center.x + radius * Math.sin(endangle);
      var y2 = center.y - radius * Math.cos(endangle);

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
        radius +
        "," +
        radius + //再画一条半径为r的弧
        " 0 " +
        big +
        " 1 " + // 弧的详细信息
        x2 +
        "," +
        y2 + //弧到(x2,y2)结束
        " Z"; //d当前路径到(cx,cy)结束
      return d;
    }
  }
};
</script>
