<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="true"
      :collapse-transition="false"
      mode="vertical"
    >
      <router-link tag="div" to="/" class="logo-wrapper">
        <Logo style="margin-left: 0px" />
      </router-link>
      <SidebarItem
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="isCollapse"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
  import { AppModule } from '../../../store/modules/app'
  import SidebarItem from './SidebarItem.vue'
  import { PermissionModule } from '../../../store/modules/permission'
  import { defineComponent } from 'vue'
  import { RouteRecordRaw } from 'vue-router'
  import Logo from './Logo.vue'

  export default defineComponent({
    components: { SidebarItem, Logo },
    computed: {
      sidebar() {
        return AppModule.sidebar
      },

      routes(): RouteRecordRaw[] {
        return PermissionModule.routes
      },

      variables() {
        return {
          menuBg: '#043953',
          menuText: '#bfcbd9',
          menuActiveText: '#409EFF',
        }
      },

      activeMenu(): any {
        const route = this.$route as any
        const { meta, path } = route
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },

      isCollapse() {
        return false
      },
    },
  })
</script>

<style lang="scss">
  .sidebar-container {
    // reset element-ui css
    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out,
        0s padding-right ease-in-out;
    }

    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .el-scrollbar__view {
      height: 100%;
    }

    .el-scrollbar__bar {
      &.is-vertical {
        right: 0px;
      }

      &.is-horizontal {
        display: none;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .el-scrollbar {
    height: 100%;
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    padding-left: 12px;
    /* justify-content: center; */
    position: relative;
    cursor: pointer;
    height: 50px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.5);
    z-index: 2;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      width: 100%;
    }
  }
</style>
