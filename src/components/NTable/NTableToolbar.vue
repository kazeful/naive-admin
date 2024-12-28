<template>
  <div flex="~" justify="between" align="items-center">
    <div>
      <slot name="buttons" />
    </div>
    <div flex="~" align="items-center" space="x-2">
      <slot name="tools" />
      <el-tooltip placement="top" content="刷新">
        <el-button icon="el-icon-refresh" circle @click="handleRefreshClick" />
      </el-tooltip>
      <el-dropdown trigger="click" type="primary">
        <el-tooltip placement="top" content="自定义列">
          <button type="button" class="el-button el-button--default is-circle">
            <SvgIcon icon-class="custom-column" />
          </button>
        </el-tooltip>
        <template #dropdown>
          <el-dropdown-menu class="max-h-40 overflow-y-auto" p="x-10px">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAll">
              全选
            </el-checkbox>
            <el-checkbox-group v-model="computedCheckedColumns" flex="~ col" @change="handleChange">
              <el-checkbox v-for="label in generalColumnsLabel" :key="label" :label="label" />
            </el-checkbox-group>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tooltip v-if="showExportExcel" placement="top" content="导出Excel">
        <button type="button" class="el-button el-button--default is-circle">
          <SvgIcon icon-class="table-export-excel" />
        </button>
      </el-tooltip>
      <el-tooltip v-if="showFullScreen" placement="top" content="全屏展示">
        <el-button icon="el-icon-full-screen" circle />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    generalColumns: Array,
    checkedColumns: Array,
    showExportExcel: Boolean,
    showFullScreen: Boolean,
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
    handleRefreshClick() {
      this.$parent.$emit('current-change')
    },
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
