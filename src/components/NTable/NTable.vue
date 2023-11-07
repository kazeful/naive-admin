<template>
  <div>
    <!-- toolbar -->
    <NTableToolbar
      v-if="showToolbar"
      :general-columns="generalColumns"
      :checked-columns="checkedColumns"
    >
      <template #default>
        <slot name="toolbar" />
      </template>
    </NTableToolbar>
    <!-- elTable -->
    <el-table
      ref="elTable"
      v-loading="loading"
      :stripe="stripe"
      m="y-4"
      v-bind="$attrs"
      v-on="getElTableListeners()"
    >
      <slot />

      <template v-for="column, index in tableColumns">
        <el-table-column
          v-if="column.type === 'selection' || column.type === 'index'"
          :key="column.type"
          v-bind="column" :align="column.align || 'center'"
        />
        <NTableColumn v-if="!column.type" :key="index" v-bind="column">
          <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </NTableColumn>
      </template>

      <template #append>
        <slot name="append" />
      </template>
    </el-table>
    <!-- elPagination -->
    <el-pagination
      ref="elPagination"
      :current-page.sync="computedCurrentPage"
      :page-size.sync="computedPageSize"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="$emit('current-change')"
    />
  </div>
</template>

<script>
import { constant, omit } from 'lodash-es'
import NTableToolbar from './NTableToolbar.vue'
import NTableColumn from './NTableColumn.vue'

export default {
  name: 'NTable',
  components: { NTableToolbar, NTableColumn },
  inheritAttrs: false,
  props: {
    showToolbar: {
      type: Boolean,
      default: true,
    },
    loading: Boolean,
    stripe: {
      type: Boolean,
      default: true,
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
    resetCurrentWhenSizeChange: {
      type: Boolean,
      default: true,
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
      checkedColumns: [],
    }
  },
  computed: {
    specificColumns() {
      return this.columns.filter(item => item.type === 'index' || item.type === 'selection')
    },
    generalColumns() {
      return this.columns.filter(item => item.type !== 'index' && item.type !== 'selection')
    },
    displayedGeneralColumns() {
      return this.generalColumns.filter(item => this.checkedColumns.includes(item.label))
    },
    tableColumns() {
      return [
        ...this.specificColumns,
        ...this.displayedGeneralColumns,
      ]
    },
    computedCurrentPage: {
      get() {
        return this.currentPage
      },
      set(newval) {
        this.$emit('update:current-page', newval)
      },
    },
    computedPageSize: {
      get() {
        return this.pageSize
      },
      set(newval) {
        this.$emit('update:page-size', newval)
      },
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
    handleSizeChange() {
      if (this.resetCurrentWhenSizeChange)
        this.computedCurrentPage = 1
      this.$emit('size-change')
    },

    getElTableListeners() {
      const omitListeners = [
        'update:current-page',
        'update:currentPage',
        'current-change',
        'update:page-size',
        'update:pageSize',
        'size-change',
      ]
      return omit(this.$listeners, omitListeners)
    },
  },
}
</script>
