<template>
  <el-tooltip v-if="!expandTrigger" v-bind="$attrs">
    <template #content>
      <slot v-if="$scopedSlots.tooltip" name="tooltip" />
      <slot v-else />
    </template>
    <div
      :style="{
        'overflow': 'hidden',
        'display': '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': realLineClamp,
        'line-clamp': realLineClamp,
      }"
    >
      <slot />
    </div>
  </el-tooltip>
  <div
    v-else
    :style="{
      'cursor': 'pointer',
      'overflow': 'hidden',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': realLineClamp,
      'line-clamp': realLineClamp,
    }"
    @click="toggle"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NEllipsis',
  props: {
    lineClamp: {
      type: [String, Number],
      default: 1,
    },
    expandTrigger: Boolean,
  },
  data() {
    return {
      realLineClamp: this.lineClamp,
    }
  },
  watch: {
    lineClamp: {
      handler(newVal) {
        this.realLineClamp = newVal
      },
    },
  },
  methods: {
    toggle() {
      if (this.realLineClamp)
        this.realLineClamp = null
      else
        this.realLineClamp = this.lineClamp
    },
  },
}
</script>
