<template>
  <router-link :to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
}
</script>
