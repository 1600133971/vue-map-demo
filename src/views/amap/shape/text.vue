<template>
  <div class="amap-text-container">
    <el-amap vid="amap-text" :zoom="zoom" :center="center" class="amap-text">
      <el-amap-text
        v-for="(text, index) in texts"
        :text="text.text"
        :offset="text.offset"
        :position="text.position"
        :events="text.events"
        :key="index">
      </el-amap-text>
    </el-amap>
  </div>
</template>

<style>
.amap-text-container {
  height: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      texts: [
        {
          position: [121.5273285, 31.21515044],
          text: "hello world",
          offset: [0, 0],
          events: {
            click: () => {
              alert("click text");
            }
          }
        }
      ]
    };
  }
};
</script>
