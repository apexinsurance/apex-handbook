<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <Navbar :is-mobile="classObj.mobile" />
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { DeviceType, AppModule } from '../store/modules/app'
import { defineComponent } from 'vue'
import { AppMain, Navbar, Sidebar } from './components'
import { ErrorModule } from '@/store/modules/error'
import { ElNotification } from 'element-plus'

const WIDTH = 1024
export default defineComponent({
  components: { AppMain, Sidebar, Navbar },
  computed: {
    device() {
      return AppModule.device
    },
    sidebar() {
      return AppModule.sidebar
    },
    classObj(): any {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === DeviceType.Mobile,
      }
    },
    error() {
      return ErrorModule.error
    },
  },
  watch: {
    $route() {
      if (this.device === DeviceType.Mobile && this.sidebar.opened) {
        AppModule.CloseSideBar(false)
      }
    },
    error(response: any) {
      if (response) {
        ElNotification({
          title: 'Error',
          message: response.message || 'Network Error',
          type: 'error',
        })
        ErrorModule.CLEAR_ERROR()
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },

  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      AppModule.ToggleDevice(DeviceType.Mobile)
      AppModule.CloseSideBar(true)
    }
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        AppModule.ToggleDevice(
          isMobile ? DeviceType.Mobile : DeviceType.Desktop
        )
        if (isMobile) {
          AppModule.CloseSideBar(true)
        } else {
          AppModule.OpenSideBar(true)
        }
      }
    },
    handleClickOutside() {
      AppModule.CloseSideBar(false)
    },
    isMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
  },
})
</script>
