<template>
  <div
    class="login-container w-full h-screen overflow-hidden #2d3a4b"
    bg="hex-2d3a4b"
  >
    <el-form
      ref="loginForm"
      class="relative max-w-full w-130 overflow-hidden"
      p="t-40 x-35px"
      m="x-auto"
      :model="loginForm"
      :rules="loginRules"
      autocomplete="on"
      label-position="left"
    >
      <div class="relative">
        <h3
          font="bold"
          text="hex-eee 26px center"
          m="x-auto b-10"
        >
          Login System
        </h3>
      </div>

      <el-form-item prop="username">
        <span
          class="inline-block w-30px"
          text="hex-889aa4 middle"
          p="y-6px r-5px l-15px"
        >
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span
            class="inline-block w-30px"
            text="hex-889aa4 middle"
            p="y-6px r-5px l-15px"
          >
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span
            class="absolute right-10px top-7px cursor-pointer select-none"
            text="hex-889aa4 16px"
            @click="showPwd"
          >
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        class="w-full"
        m="b-8"
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin"
      >
        Login
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { noop } from 'lodash-es'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      const valid_map = ['admin', 'editor']
      if (!valid_map.includes(value.trim()))
        callback(new Error('Please enter the correct user name'))

      else
        callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6)
        callback(new Error('The password can not be less than 6 digits'))

      else
        callback()
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
    }
  },
  watch: {
    $route: {
      handler(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '')
      this.$refs.username.focus()

    else if (this.loginForm.password === '')
      this.$refs.password.focus()
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password')
        this.passwordType = ''

      else
        this.passwordType = 'password'

      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery }).catch(noop)
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        }
        else {
          // eslint-disable-next-line no-console
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect')
          acc[cur] = query[cur]

        return acc
      }, {})
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
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
