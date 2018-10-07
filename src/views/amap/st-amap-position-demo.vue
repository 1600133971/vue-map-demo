<template>
  <div class="amap-st-container">
    <st-amap-position @drag="dragMap" class="mapbox" id="js-amap-container" city="深圳" ></st-amap-position>
    <ul class="info">
      <li><span>经度：</span>{{ dragData.lng }}</li>
      <li><span>纬度：</span>{{ dragData.lat }}</li>
      <li><span>地址：</span>{{ dragData.address }}</li>
      <li><span>最近的路口：</span>{{ dragData.nearestJunction }}</li>
      <li><span>最近的路：</span>{{ dragData.nearestRoad }}</li>
      <li><span>最近的POI：</span>{{ dragData.nearestPOI }}</li>
    </ul>
  </div>
</template>

<style>
.amap-st-container .mapbox {
  width: 600px;
  height: 700px;
  margin-bottom: 20px;
  float: left;
}

.amap-st-container .info {
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 30px;
  margin-left: 620px;
}
</style>

<script>
export default {
  data() {
    return {
      dragData: {
        lng: null,
        lat: null,
        address: null,
        nearestJunction: null,
        nearestRoad: null,
        nearestPOI: null
      }
    };
  },
  methods: {
    dragMap(data) {
      this.dragData = {
        lng: data.position.lng,
        lat: data.position.lat,
        address: data.address,
        nearestJunction: data.nearestJunction,
        nearestRoad: data.nearestRoad,
        nearestPOI: data.nearestPOI
      };
    }
  }
};
</script>
