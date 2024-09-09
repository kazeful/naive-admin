<template>
  <div p="5">
    <NTable
      :loading="loading"
      :columns="columns"
      :data="data"
      row-key="id"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      @current-change="fetchData"
      @selection-change="selectionChange"
    >
      <el-table-column label="状态">
        <el-table-column
          prop="status"
          label="status"
        />
      </el-table-column>
      <template #date="{ row }">
        <span>{{ row.date }}</span>
      </template>
    </NTable>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import NTable from '@/components/NTable'
import { noop } from 'lodash-es'

export default {
  components: {
    NTable,
  },
  data() {
    return {
      data: [],
      columns: [
        {
          type: 'selection',
          reserveSelection: true,
        },
        {
          prop: 'date',
          label: '日期',
        },
        {
          prop: 'author',
          label: '姓名',
          renderCell() {
            return 123
          },
        },
        {
          prop: 'title',
          label: '标题',
          children: [
            {
              prop: 'pageviews',
              label: '浏览量',
            },
            {
              prop: 'id',
              label: '唯一标识',
            },
          ],
        },
      ],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      const res = await getList().catch(noop)
      this.data = res.data.items.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      this.total = res.data.total
      this.loading = false
    },
    selectionChange(selection) {
      console.log(selection)
    },
  },
}
</script>
