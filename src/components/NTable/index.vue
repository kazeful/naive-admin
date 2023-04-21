<template>
  <div>
    <!-- toolbar -->
    <div
      v-if="showToolbar"
      flex="~"
      justify="between"
      align="items-center"
    >
      <div>
        <slot name="toolbar-left" />
      </div>
      <div>
        <div v-if="showCustomColumn">
          <el-dropdown split-button type="primary">
            自定义列
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
                  v-model="checkedColumns"
                  flex="~ col"
                  @change="handleCheckedColumns"
                >
                  <el-checkbox v-for="column in generalColumns" :key="column.prop" :label="column.label">
                    {{ column.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- elTable -->
    <el-table
      ref="elTable"
      v-loading="loading"
      m="y-4"
      v-bind="$attrs"
      v-on="getElTableListeners()"
    >
      <slot />

      <template v-for="(item, index) in tableColumns">
        <el-table-column
          v-if="item.type === 'selection' || item.type === 'index'"
          :key="item.type"
          v-bind="item"
          :align="item.align || 'center'"
        />
        <el-table-column v-else :key="index" v-bind="item" :align="item.align || 'center'">
          <template v-if="$scopedSlots[`${item.prop}-header`]" #header="scope">
            <slot :name="`${item.prop}-header`" v-bind="scope" />
          </template>
          <template v-if="$scopedSlots[item.prop]" #default="scope">
            <slot :name="item.prop" v-bind="scope" />
          </template>
        </el-table-column>
      </template>

      <template #append>
        <slot name="append" />
      </template>
    </el-table>
    <!-- elPagination -->
    <el-pagination
      ref="elPagination"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { constant, omit } from 'lodash-es'

export default {
  name: 'NTable',
  inheritAttrs: false,
  props: {
    showToolbar: {
      type: Boolean,
      default: true,
    },
    showCustomColumn: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: constant([]),
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: constant([10, 20, 30, 40, 50]),
    },
    total: {
      type: Number,
      default: 0,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
  },
  data() {
    return {
      checkAll: false,
      checkedColumns: [],
      isIndeterminate: true,
    }
  },
  computed: {
    specificColumns() {
      return this.columns.filter(item => item.type === 'index' || item.type === 'selection')
    },
    generalColumns() {
      return this.columns.filter(item => item.type !== 'index' && item.type !== 'selection')
    },
    generalColumnsLabel() {
      return this.generalColumns.map(item => item.label)
    },
    tableColumns() {
      return this.specificColumns.concat(this.generalColumns.filter(item => this.checkedColumns.includes(item.label)))
    },
  },
  watch: {
    columns: {
      handler(newVal) {
        this.checkedColumns = newVal.map(item => item.label)
      },
      immediate: true,
    },
  },
  methods: {
    handleCheckAll(val) {
      this.checkedColumns = val ? this.generalColumnsLabel : []
      this.isIndeterminate = false
    },
    handleCheckedColumns(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.generalColumnsLabel.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.generalColumnsLabel.length
    },

    handleCurrentChange(currentPage) {
      this.$emit('update:current-page', currentPage)
      this.$emit('current-change')
    },
    handleSizeChange(pageSize) {
      this.$emit('update:current-page', 1)
      this.$emit('update:page-size', pageSize)
      this.$emit('page-size-change')
    },

    getElTableListeners() {
      const omitListeners = [
        'update:current-page',
        'current-change',
        'update:page-size',
        'page-size-change',
      ]
      return omit(this.$listeners, omitListeners)
    },
  },
}
</script>
