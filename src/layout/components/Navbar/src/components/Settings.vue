<template>
  <div p="6" text="14px" font="leading-normal">
    <div>
      <div
        flex="~"
        justify="between"
        text="14px black/65"
        p="y-12px"
      >
        <span>Open Tags-View</span>
        <el-switch v-model="tagsView" />
      </div>

      <div
        flex="~"
        justify="between"
        text="14px black/65"
        p="y-12px"
      >
        <span>Fixed Header</span>
        <el-switch v-model="fixedHeader" />
      </div>

      <div
        flex="~"
        justify="between"
        text="14px black/65"
        p="y-12px"
      >
        <span>Sidebar Logo</span>
        <el-switch v-model="sidebarLogo" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val,
        })
      },
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val,
        })
      },
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val,
        })
      },
    },
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val,
      })
    },
  },
}
</script>
