<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({})
</script>

<style lang="scss" scoped>
  .app-main {
    overflow: hidden;
    min-height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
  }
</style>
