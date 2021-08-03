<template>
  <div
    :class="{ collapse }"
    class="sidebar-logo-container w-4/5 h-50px overflow-hidden"
    m="x-auto"
  >
    <transition name="fade">
      <div
        v-if="collapse"
        key="collapse"
        class="h-full"
        flex="~"
        justify="center"
        align="items-center"
      >
        <svg-icon class="w-6 h-6" text="hex-93c5fd" :icon-class="logo" />
      </div>
      <div
        v-else
        key="expand"
        class="h-full"
        flex="~"
        justify="between"
        align="items-center"
      >
        <svg-icon class="w-6 h-6" text="hex-93c5fd" :icon-class="logo" />
        <span text="white 16px">
          {{ title }}
        </span>
      </div>
    </transition>
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
