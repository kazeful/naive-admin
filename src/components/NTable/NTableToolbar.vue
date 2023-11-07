<template>
  <div flex="~" justify="between" align="items-center">
    <div>
      <slot />
    </div>
    <div flex="~" align="items-center">
      <el-dropdown trigger="click" type="primary">
        <el-tooltip content="自定义列">
          <SvgIcon text="xl" icon-class="custom-column" />
        </el-tooltip>
        <template #dropdown>
          <el-dropdown-menu
            class="max-h-40 overflow-y-auto"
            p="x-10px"
          >
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAll"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="computedCheckedColumns"
              flex="~ col"
              @change="handleChange"
            >
              <el-checkbox v-for="column in generalColumns" :key="column.prop" :label="column.label">
                {{ column.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tooltip content="导出Excel">
        <SvgIcon text="xl" icon-class="table-export-excel" />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    generalColumns: Array,
    checkedColumns: Array,
  },
  data() {
    return {
      checkAll: true,
      isIndeterminate: false,
    }
  },
  computed: {
    computedCheckedColumns: {
      get() {
        return this.checkedColumns
      },
      set(newval) {
        this.$emit('update:checked-columns', [...newval])
      },
    },
    generalColumnsLabel() {
      return this.generalColumns.map(item => item.label)
    },
  },
  methods: {
    handleCheckAll(val) {
      this.computedCheckedColumns = val ? this.generalColumnsLabel : []
      this.isIndeterminate = false
    },
    handleChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.generalColumnsLabel.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.generalColumnsLabel.length
    },
  },
}
</script>

<style scoped>
.el-tooltip {
  margin: 0 5px;
}
</style>
