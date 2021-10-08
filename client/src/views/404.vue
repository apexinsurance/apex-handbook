<template>
  <div>
    <div class="flex justify-around items-center">
      <div class="flex flex-col self-center -top-5">
        <h2 class="mt-8 text-xl font-semibold text-blue-500 text-center">
          404 error
        </h2>
        <h1 class="text-5xl font-bold text-center">Page not found.</h1>
        <h2 class="mt-2 text-xl font-semibold text-gray-600 text-center">
          Sorry,we couldn't find the page you're looking for.
        </h2>
        <el-button type="text" class="text-xl" @click="$router.push('/')">
          Go back home <i class="el-icon-right" />
        </el-button>
      </div>
      <img src="@/assets/404.gif" alt="404" class="mt-8" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {}
  },
})
</script>
