<template>
  <div p="5">
    <NTable
      height="600"
      border
      :loading="loading"
      :data="data"
      :columns="columns"
      show-operation
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
    >
      <el-table-column label="标题">
        <el-table-column
          prop="pageviews"
          label="浏览量"
        />
        <el-table-column
          prop="id"
          label="唯一标识"
        />
      </el-table-column>
      <template #date="{ row }">
        <span>{{ row.date }}</span>
      </template>
    </NTable>

    <CustomTable :columns="columns" :data="data">
      <el-table-column label="地址">
        <el-table-column
          prop="address"
          label="省份"
        />
      </el-table-column>
    </CustomTable>
  </div>
</template>

<script>
import { noop } from 'lodash-es'
import { getList } from '@/api/table'
import NTable from '@/components/NTable'
import CustomTable from '@/components/CustomTable'

export default {
  components: {
    NTable,
    CustomTable,
  },
  data() {
    return {
      data: [],
      columns: [
        {
          type: 'selection',
        },
        {
          prop: 'date',
          label: '日期',
        },
        {
          prop: 'author',
          label: '姓名',
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
      total: 200,
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      const res = await getList().catch(noop)
      this.data = res.data.items
      this.total = res.data.total
      this.loading = false
    },
  },
}
</script>
