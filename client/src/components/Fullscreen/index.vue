<template>
  <div id="screenfull">
    <span v-if="isFullscreen" @click="click" class="material-icons">
      fullscreen_exit
    </span>
    <span v-else @click="click" class="material-icons"> fullscreen </span>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'
import { defineComponent } from 'vue'
const sf = screenfull
export default defineComponent({
  data() {
    return {
      isFullscreen: false,
    }
  },
  mounted() {
    if (sf.isEnabled) {
      sf.on('change', this.change)
    }
  },
  beforeDestory() {
    if (sf.isEnabled) {
      sf.off('change', this.change)
    }
  },
  methods: {
    change() {
      if (sf.isEnabled) {
        this.isFullscreen = sf.isFullscreen
      }
    },
    click() {
      if (!sf.isEnabled) {
        ElMessage({
          message: 'You browser can not work',
          type: 'success',
        })
        return false
      }
      sf.toggle()
    },
  },
})
</script>
