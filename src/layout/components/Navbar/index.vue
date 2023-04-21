<template>
  <div
    class="h-50px overflow-hidden"
    flex="~"
    bg="white"
    shadow="hex-001529/8 sm"
  >
    <Hamburger
      :is-active="sidebar.opened"
      class="h-full cursor-pointer"
      font="leading-46px"
      bg="hover:black/3"
      transition="colors 300"
      @toggle-click="toggleSideBar"
    />

    <Breadcrumb />

    <div
      class="h-full"
      flex="~"
      justify="center"
      align="items-center"
      m="l-auto r-5"
    >
      <el-tooltip content="Screenfull" placement="bottom">
        <div v-screenfull.icon m="x-1" text="24px" />
      </el-tooltip>
      <el-dropdown class="cursor-pointer" m="x-1" trigger="click">
        <img :src="avatar" class="w-6 h-6" b="rounded-1/2">
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/kazeful/naive-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span class="block">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tooltip content="System Setting" placement="bottom">
        <i
          class="el-icon-setting cursor-pointer"
          text="24px"
          m="x-1"
          @click="setting = true"
        />
      </el-tooltip>
    </div>

    <el-drawer title="System Setting" append-to-body :visible.sync="setting" direction="rtl">
      <Settings />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from './components/Breadcrumb.vue'
import Hamburger from './components/Hamburger.vue'
import Settings from './components/Settings.vue'
import screenfull from '@/directives/screenfull'

export default {
  directives: {
    screenfull,
  },
  components: {
    Breadcrumb,
    Hamburger,
    Settings,
  },
  data() {
    return {
      setting: false,
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  },
}
</script>
