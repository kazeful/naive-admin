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
function hasHorizontalScrollbar(element) {
  return element.scrollWidth > element.clientWidth
}

function hasEllipsis(element) {
  const temp = element.cloneNode(true)
  temp.style.overflow = 'auto'
  const parentNode = element.parentNode
  if (!parentNode)
    return false
  // It must be loaded to the parent element, not document.body
  parentNode.appendChild(temp)
  const hasEllipsis = hasHorizontalScrollbar(temp)
  parentNode.removeChild(temp)
  return hasEllipsis
}

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
