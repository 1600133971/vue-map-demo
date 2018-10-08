import Vue from "vue";

import stAmap from "@/components/amap/st-amap.vue";
import stAmapPosition from "@/components/amap/st-amap-position.vue";
import stAmapRemarker from "@/components/amap/st-amap-remarker.vue";
import stAmapSimpleMarker from "@/components/amap/st-amap-simple-marker.vue";
import stAmapInfoWindow from "@/components/amap/st-amap-info-window.vue";
import stAmapCanvas from "@/components/amap/st-amap-canvas.vue";
import stAmapSvg from "@/components/amap/st-amap-svg.vue";
import stAmapSector from "@/components/amap/st-amap-sector.vue";
import stAmapAzimuth from "@/components/amap/st-amap-azimuth.vue";

Vue.component("st-amap", stAmap);
Vue.component("st-amap-position", stAmapPosition);
Vue.component("st-amap-remarker", stAmapRemarker);
Vue.component("st-amap-simple-marker", stAmapSimpleMarker);
Vue.component("st-amap-info-window", stAmapInfoWindow);
Vue.component("st-amap-canvas", stAmapCanvas);
Vue.component("st-amap-svg", stAmapSvg);
Vue.component("st-amap-sector", stAmapSector);
Vue.component("st-amap-azimuth", stAmapAzimuth);
