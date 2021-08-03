<template>
  <div
    v-waterMarker="waterMarker"
    class="h-screen"
    p="5"
  >
    <span>Hi~ {{ name }}</span>
  </div>
</template>

<script>
import { waterMarker } from 'naive-directives'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  directives: {
    waterMarker,
  },
  data() {
    return {
      waterMarker: {
        text: '送你一朵小红花',
        font: '20px Fire Code',
      },
    }
  },
  computed: {
    ...mapGetters(['name']),
  },
  mounted() {
    this.addMenuBadge({
      name: 'Dashboard',
      value: 10,
    })
  },
  methods: {
    ...mapActions('menuBadge', ['addMenuBadge']),
  },
}
</script>
