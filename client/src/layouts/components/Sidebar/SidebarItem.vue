<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      'menu-wrapper',
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel }
    ]"
  >
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
          class="navbar-menu-item"
        >
          <span
            v-if="theOnlyOneChild.meta.icon"
            class="material-icons mr-2 md-18"
            >{{ theOnlyOneChild.meta.icon }}</span
          >
          <span v-if="theOnlyOneChild.meta.title" slot="title">{{
            theOnlyOneChild.meta.title
          }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <div class="navbar-menu-item">
          <span
            v-if="item.meta && theOnlyOneChild.meta.icon"
            class="material-icons md-18"
            >{{ theOnlyOneChild.meta.icon }}</span
          >
          <span v-if="item.meta && item.meta.title" slot="title">{{
            item.meta.title
          }}</span>
        </div>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-sub-menu>
  </div>
</template>
<script lang="ts">
import SidebarItemLink from './SidebarItemLink.vue'
import { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { SidebarItemLink },
  props: {
    item: {
      type: Object as () => RouteRecordRaw,
      required: true
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    isFirstLevel: {
      type: Boolean,
      default: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },

  computed: {
    showingChildNumber() {
      if (this.item.children) {
        const showingChildren = this.item.children.filter((item: any) => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    },

    theOnlyOneChild() {
      if (this.showingChildNumber > 1) {
        return null
      }
      if (this.item.children) {
        for (const child of this.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      return { ...this.item, path: '' }
    }
  },
  methods: {
    resolvePath(routePath: string) {
      return this.basePath + routePath
    }
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}

.navbar-menu-item {
  display: flex;
  align-items: center;
}
.navbar-menu-item span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
