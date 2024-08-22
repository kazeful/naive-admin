<template>
  <div class="sidebar-logo-container h-50px grid" :class="{ collapse }">
    <div flex="~" m="auto">
      <svg-icon class="w-6 h-6" text="hex-93c5fd" :icon-class="logo" />
      <span v-show="!collapse" class="whitespace-nowrap" m="l-4" font="leading-normal" text="white 16px">
        {{ title }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: 'Naive Admin',
      logo: 'logo',
    }
  },
}
</script>
