<template>
  <div
    :class="classObj"
    class="app-wrapper relative h-full w-full"
  >
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="absolute top-0 z-999 h-full w-full bg-black op-30"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div
        class="fixed top-0 right-0 z-9"
        transition="all duration-280"
        :class="{ 'fixed-header': fixedHeader }"
      >
        <Navbar />
        <TagsView v-if="needTagsView" />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
    }),
    classObj() {
      return {
        'hide-sidebar': !this.sidebar.opened,
        'open-sidebar': this.sidebar.opened,
        'without-animation': this.sidebar.withoutAnimation,
        'mobile': this.device === 'mobile',
      }
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;

  &.mobile.open-sidebar {
    position: fixed;
    top: 0;
  }
}

.fixed-header {
  width: calc(100% - #{$sideBarWidth});
}

.hide-sidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
