<template>
  <el-container>
    <el-main class="main">
      <div :id="id" class="st-map-info-window">正在加载数据 ...</div>
    </el-main>
    <el-aside class="aside">
      <el-button class="button" @click="show()">show</el-button>
      <el-button class="button" @click="hide()">hide</el-button>
    </el-aside>
  </el-container>
</template>

<style lang="css">
.st-map-info-window {
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
      infoWindow: null
    };
  },
  methods: {
    initMap() {
      //构建信息窗体中显示的内容
      var info = [];
      info.push(
        '<div><div><img style="float:left;" src=" https://webapi.amap.com/images/autonavi.png "/></div> '
      );
      info.push('<div style="padding:0px 0px 0px 4px;"><b>高德软件</b>');
      info.push("电话 : 010-84107000   邮编 : 100102");
      info.push("地址 :北京市朝阳区望京阜荣街10号首开广场4层</div></div>");
      this.infoWindow = new this.AMap.InfoWindow({
        content: info.join("<br/>") //使用默认信息窗体框样式，显示信息内容
      });
    },
    show() {
      this.infoWindow.open(this.map, this.map.getCenter());
    },
    hide() {
      this.infoWindow.close();
    }
  }
};
</script>
