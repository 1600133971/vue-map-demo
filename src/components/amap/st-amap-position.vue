<template>
  <div class="div-st-amap-position">
    <div class="search" v-if="placeSearch">
      <el-input type="text" placeholder="请输入关键字" v-model="searchKey">
        <el-button type="button" slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
      </el-input>
      <div id="js-result" v-show="searchKey" class="result"></div>
    </div>
    <div :id="id" class="st-map">正在加载数据 ...</div>
  </div>
</template>

<script>
import amapBase from "./st-amap-base.js";
export default {
  extends: amapBase,
  props: ["city"],
  data() {
    return {
      searchKey: "",
      placeSearch: null,
      dragStatus: false
    };
  },
  watch: {
    searchKey() {
      if (this.searchKey === "") {
        this.placeSearch.clear();
      }
    }
  },
  methods: {
    handleSearch() {
      if (this.searchKey) {
        this.placeSearch.search(this.searchKey);
      }
    },
    initMap() {
      this.AMapUI.loadUI(["misc/PositionPicker"], PositionPicker => {
        // 加载地图搜索插件
        this.AMap.service("AMap.PlaceSearch", () => {
          this.placeSearch = new this.AMap.PlaceSearch({
            pageSize: 5,
            pageIndex: 1,
            citylimit: true,
            city: this.city,
            map: this.map,
            panel: "js-result"
          });
        });

        // 启用工具条
        this.AMap.plugin(
          ["AMap.ToolBar", "AMap.Scale", "AMap.OverView", "AMap.MapType"],
          () => {
            this.map.addControl(new this.AMap.ToolBar({ position: "LT" }));
            this.map.addControl(new this.AMap.Scale());
            this.map.addControl(new this.AMap.OverView({ isOpen: true }));
            this.map.addControl(new this.AMap.MapType());
          }
        );

        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: "dragMap", // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: this.map // 依赖地图对象
        });

        // 拖拽完成发送自定义 drag 事件
        positionPicker.on("success", positionResult => {
          // 过滤掉初始化地图后的第一次默认拖放
          if (!this.dragStatus) {
            this.dragStatus = true;
          } else {
            this.$emit("drag", positionResult);
          }
        });
        // 启动拖放
        positionPicker.start();
      });
    }
  }
};
</script>

<style lang="css">
.div-st-amap-position {
  min-width: 800px;
  min-height: 400px;
  position: relative;
}
.div-st-amap-position .st-map {
  width: 100%;
  height: 100%;
}
.div-st-amap-position .search { 
  position: absolute;
  top: 10px;
  left: 80px;
  width: 285px;
  z-index: 1;
}
.div-st-amap-position .result {
  max-height: 300px;
  overflow: auto;
  margin-top: 10px;
}
</style>
