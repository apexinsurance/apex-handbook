<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu flex items-center">
      <template v-if="!isMobile">
        <search id="header-search" class="right-menu-item" />
        <el-divider direction="vertical" class="mx-3" />
        <fullscreen id="screenfull" class="right-menu-item hover-effect" />
        <el-divider direction="vertical" class="mx-3" />

        <el-dropdown trigger="click" @command="handleCommandLanguage">
          <div class="el-dropdown-link">
            <span class="material-icons" style="color: #043953">
              translate
            </span>
          </div>
          <template #dropdown>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="ru" :disabled="language === 'ru'"
                >Русский
              </el-dropdown-item>
              <el-dropdown-item command="uz" :disabled="language === 'uz'"
                >O'zbek
              </el-dropdown-item>
              <el-dropdown-item command="en" :disabled="language === 'en'"
                >English</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <el-divider direction="vertical" class="mx-3" />
      <span class="material-icons mr-2" style="color: #043953">
        account_circle
      </span>
      <el-dropdown trigger="click" class="mr-3" @command="handleCommand">
        <div class="el-dropdown-link">
          Rashid Mamadjanov<i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1" icon="el-icon-user-solid"
              >Профиль</el-dropdown-item
            >
            <el-dropdown-item command="logout" icon="el-icon-caret-right"
              >Выйти</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
  import { AppModule, DeviceType } from '../../../store/modules/app'
  import { UserModule } from '../../../store/modules/user'
  import Breadcrumb from '../../../components/Breadcrumb/index.vue'
  import Hamburger from '../../../components/Hamburger/index.vue'
  import Search from '../../../components/HeaderSearch/index.vue'
  import Fullscreen from '../../../components/Fullscreen/index.vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: { Breadcrumb, Hamburger, Search, Fullscreen },
    data() {
      return {
        search: '',
        language: 'ru',
      }
    },
    props: {
      isMobile: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      sidebar() {
        return AppModule.sidebar
      },

      device() {
        return AppModule.device.toString()
      },

      // isMobile() {
      //   return AppModule.device === DeviceType.Mobile
      // },

      avatar() {
        return UserModule.avatar
      },
    },
    methods: {
      toggleSideBar() {
        AppModule.ToggleSideBar(false)
      },
      async handleCommand(command: any) {
        if (command === 'logout') {
          await UserModule.LogOut()
          this.$router.push('/login')
        }
      },
      handleCommandLanguage(command: 'uz' | 'ru' | 'en') {
        this.language = command
      },
    },
  })
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      /* line-height: 46px; */
      height: 100%;
      float: left;
      padding: 0 15px;
      cursor: pointer;
      /* transition: background 0.3s; */
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 50px;
      display: flex;
      justify-content: center;
      color: #043953;
      .items {
        display: flex;
        align-items: center;
      }
      .el-dropdown-link {
        white-space: nowrap;
      }
    }
  }
</style>
