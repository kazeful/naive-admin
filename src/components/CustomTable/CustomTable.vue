<script>
import CustomTableColumn from './CustomTableColumn.vue'

export default {
  name: 'CustomTable',
  components: { CustomTableColumn },
  inheritAttrs: false,
  props: {
    columns: Array,
  },
}
</script>

<template>
  <el-table v-bind="$attrs" v-on="$listeners">
    <slot />
    <template v-for="column, index in columns">
      <el-table-column
        v-if="column.type === 'selection' || column.type === 'index'"
        :key="column.type"
        v-bind="column" :align="column.align || 'center'"
      />
      <CustomTableColumn v-if="!column.type" :key="index" v-bind="column">
        <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </CustomTableColumn>
    </template>
    <template #append>
      <slot name="append" />
    </template>
  </el-table>
</template>
