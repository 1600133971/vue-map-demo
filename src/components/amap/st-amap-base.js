import { AmapKey, AmapSDKVersion, AmapUiSDKVersion } from "./st-amap-config";

const amapBase = {
  props: ["lng", "lat", "id", "zoom", "mapStyle"],
  data() {
    return {
      AMapUI: null,
      AMap: null,
      map: null
    };
  },
  methods: {
    remoteLoad(url, hasCallback) {
      return createScript(url);
      function createScript(url) {
        let scriptElement = document.createElement("script");
        document.body.appendChild(scriptElement);
        let promise = new Promise((resolve, reject) => {
          scriptElement.addEventListener(
            "load",
            e => {
              removeScript(scriptElement);
              if (!hasCallback) {
                resolve(e);
              }
            },
            false
          );

          scriptElement.addEventListener(
            "error",
            e => {
              removeScript(scriptElement);
              reject(e);
            },
            false
          );

          if (hasCallback) {
            window.____callback____ = function() {
              resolve();
              window.____callback____ = null;
            };
          }
        });

        if (hasCallback) {
          url += "&callback=____callback____";
        }

        scriptElement.src = url;

        return promise;
      }
      function removeScript(scriptElement) {
        document.body.removeChild(scriptElement);
      }
    }
  },
  async created() {
    if (!this.AMap || !this.AMapUI) {
      await this.remoteLoad(
        `http://webapi.amap.com/maps?v=${AmapSDKVersion}&key=${AmapKey}`
      );
      await this.remoteLoad(
        `http://webapi.amap.com/ui/1.0/main.js?v=${AmapUiSDKVersion}`
      );
    }

    this.AMapUI = window.AMapUI;
    this.AMap = window.AMap;
    let mapConfig = {
      zoom: this.zoom || 12,
      mapStyle: this.mapStyle || "amap://styles/normal"
    };
    if (this.lat && this.lng) {
      mapConfig.center = [this.lng, this.lat];
    }
    this.map = new this.AMap.Map(this.id, mapConfig);
    this.map.on("complete", () => {
      if (this.initMap && typeof this.initMap === "function") {
        this.initMap();
      }
    });
  },
  destroyed() {
    if (this.map) {
      this.map.destroy();
      this.map = null;
      this.AMap = null;
      this.AMapUI = null;
    }
  }
};

export default amapBase;
