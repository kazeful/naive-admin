<template>
  <div
    ref="container"
    class="truncate"
  >
    <el-tooltip
      v-if="showTooltip"
      class="inline-block w-full truncate"
      v-bind="$attrs"
      :content="content"
    >
      <span>{{ content }}</span>
    </el-tooltip>
    <span v-else>{{ content }}</span>
  </div>
</template>

<script>
import { hasEllipsis } from '@/utils/has'

export default {
  name: 'LazyTooltip',
  inheritAttrs: false,
  props: {
    content: String,
  },
  data() {
    return {
      showTooltip: false,
    }
  },
  watch: {
    async content() {
      this.showTooltip = false
      await this.$nextTick()
      this.showTooltip = hasEllipsis(this.$refs.container)
    },
  },
  mounted() {
    this.showTooltip = hasEllipsis(this.$refs.container)
  },
}
</script>
