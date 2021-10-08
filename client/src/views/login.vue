<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <logo />
      </div>

      <el-form-item prop="username">
        <span class="material-icons svg-container"> person </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          name="username"
          type="text"
          autocomplete="on"
          placeholder="username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="material-icons svg-container" :height="25"> lock </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="password"
          name="password"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <span v-if="passwordType === 'password'" class="material-icons">
            visibility
          </span>
          <span v-else class="material-icons"> visibility_off </span>
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        Войти
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { UserModule } from '../store/modules/user'
  import Logo from '../layouts/components/Sidebar/Logo.vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: { Logo },
    data() {
      const validateUsername = (rule: any, value: string, callback: any) => {
        if (!value) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule: any, value: string, callback: any) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: '111111',
        },
        loginRules: {
          username: [{ validator: validateUsername, trigger: 'blur' }],
          password: [{ validator: validatePassword, trigger: 'blur' }],
        },
        passwordType: 'password',
        loading: false,
        showDialog: false,
        redirect: '',
        otherQuery: {} as Record<string, any>,
      }
    },
    watch: {
      $route(route: any) {
        const query = route.query as Record<string, any>
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
    },

    mounted() {
      if (this.loginForm.username === '') {
        ;(this.$refs.username as any).focus()
      } else if (this.loginForm.password === '') {
        ;(this.$refs.password as any).focus()
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          ;(this.$refs.password as any).focus()
        })
      },
      handleLogin() {
        ;(this.$refs.loginForm as any).validate(async (valid: boolean) => {
          if (valid) {
            this.loading = true
            await UserModule.Login(this.loginForm)
            this.$router
              .push({
                path: this.redirect || '/',
                query: this.otherQuery,
                // eslint-disable-next-line @typescript-eslint/no-empty-function
              })
              .catch(() => {})
            // Just to simulate the time of the request
            setTimeout(() => {
              this.loading = false
            }, 0.5 * 1000)
          } else {
            return false
          }
        })
      },
      getOtherQuery(query: Record<string, any>) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {} as Record<string, any>)
      },
    },
  })
</script>

<style lang="scss">
  @supports (-webkit-mask: none) and (not (cater-color: #fff)) {
    .login-container .el-input {
      input {
        color: #fff;
      }
      input::first-line {
        color: #eee;
      }
    }
  }

  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        height: 47px;
        background: transparent;
        border: 0px;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #eee;
        caret-color: #fff;
        -webkit-appearance: none;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #043953 inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background-color: #043953;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #889aa4;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
