<template>
  <div
    :class="[{ 'is-active': isActive }]"
    @click="toggleClick"
  >
    <span class="material-icons svg-icon"> menu_open </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi"

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleClick() {
      this.$emit("toggle-click")
    },
  },
})
</script>

<style lang="scss" scoped>
.svg-icon {
  /* vertical-align: middle; */
  margin-top: -8px;
}

.is-active {
  transform: rotate(180deg);
}
</style>
