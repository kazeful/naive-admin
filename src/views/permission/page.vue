<template>
  <div p="5">
    <SwitchRoles @change="handleRolesChange" />
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'PagePermission',
  components: { SwitchRoles },
  methods: {
    handleRolesChange() {
      this.$router.push({ path: `/permission/index?${+new Date()}` })
    },
  },
}
</script>
