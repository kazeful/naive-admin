<template>
  <el-table-column v-bind="column" :align="column.align || 'center'">
    <template v-if="$scopedSlots[`${column.prop}-header`]" #header="scope">
      <slot :name="`${column.prop}-header`" v-bind="scope" />
    </template>
    <template v-if="$scopedSlots[column.prop]" #default="scope">
      <slot :name="column.prop" v-bind="scope" />
    </template>
    <template v-for="item in column.children">
      <NestedTableColumn v-if="!item.type && item.prop" :key="item.prop" :column="item">
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
  props: {
    column: Object,
  },
}
</script>
