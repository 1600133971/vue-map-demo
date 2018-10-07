<template>
  <div class="amap-info-window-container">
    <el-amap vid="amap-info-window" :zoom="zoom" :center="center" class="amap-info-window">
      <el-amap-info-window
        :position="currentWindow.position"
        :content="currentWindow.content"
        :visible="currentWindow.visible"
        :events="currentWindow.events">
      </el-amap-info-window>
    </el-amap>
    <el-button @click="switchWindow(0)">Show First Window</el-button>
    <el-button @click="switchWindow(1)">Show Second Window</el-button>
  </div>
</template>

<style>
.amap-info-window {
  height: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      zoom: 14,
      center: [121.5273285, 31.21515044],
      windows: [
        {
          position: [121.5273285, 31.21515044],
          content: "Hi! I am here!",
          visible: true,
          events: {
            close() {
              console.log("close infowindow1");
            }
          }
        },
        {
          position: [121.5375285, 31.21515044],
          content: "Hi! I am here too!",
          visible: true,
          events: {
            close() {
              console.log("close infowindow2");
            }
          }
        }
      ],
      slotWindow: {
        position: [121.5163285, 31.21515044]
      },
      currentWindow: {
        position: [0, 0],
        content: "",
        events: {},
        visible: false
      }
    };
  },

  mounted() {
    this.currentWindow = this.windows[0];
  },

  methods: {
    switchWindow(tab) {
      this.currentWindow.visible = false;
      this.$nextTick(() => {
        this.currentWindow = this.windows[tab];
        this.currentWindow.visible = true;
      });
    }
  }
};
</script>
