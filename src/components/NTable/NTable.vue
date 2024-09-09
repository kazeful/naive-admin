<template>
  <div>
    <!-- toolbar -->
    <NTableToolbar
      v-if="showToolbar"
      :general-columns="generalColumns"
      :checked-columns.sync="checkedColumns"
    >
      <template #default>
        <slot name="toolbar" />
      </template>
    </NTableToolbar>
    <!-- elTable -->
    <el-table
      ref="elTable"
      v-loading="loading"
      m="y-4"
      v-bind="$attrs"
      v-on="getElTableListeners()"
    >
      <slot />

      <template v-for="column in columns">
        <el-table-column
          v-if="column.type"
          :key="column.type"
          :align="column.align || 'center'"
          v-bind="column"
        />
        <NTableColumn v-else :key="column.prop" v-bind="column">
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
      v-if="showPagination"
      ref="elPagination"
      text="right"
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
import { flatten } from '@/utils'
import { constant, omit } from 'lodash-es'
import NTableColumn from './NTableColumn.vue'
import NTableToolbar from './NTableToolbar.vue'

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
    columns: {
      type: Array,
      default: constant([]),
    },
    showPagination: {
      type: Boolean,
      default: true,
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
      default: constant([10, 20, 30, 40, 50, 100]),
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
    flatColumns() {
      return flatten(this.columns)
    },
    specificColumns() {
      return this.flatColumns.filter(item => item.type)
    },
    generalColumns() {
      return this.flatColumns.filter(item => !item.type)
    },
  },
  watch: {
    generalColumns: {
      handler(newval) {
        this.checkedColumns = newval.map(item => item.label)
      },
      immediate: true,
    },
    checkedColumns(newval) {
      this.generalColumns.forEach((column) => {
        column.visible = newval.includes(column.label)
      })
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
