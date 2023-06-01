<template>
  <el-table-column v-bind="$attrs" :align="$attrs.align || 'center'">
    <template v-if="$scopedSlots[`${$attrs.prop}-header`]" #header="scope">
      <slot :name="`${$attrs.prop}-header`" v-bind="scope" />
    </template>
    <template v-if="$scopedSlots[$attrs.prop]" #default="scope">
      <slot :name="$attrs.prop" v-bind="scope" />
    </template>
    <template v-for="column, index in $attrs.children">
      <NestedTableColumn v-if="!column.type" :key="index" v-bind="column">
        <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </NestedTableColumn>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'NestedTableColumn',
  inheritAttrs: false,
}
</script>
