<template>
  <div p="5">
    <!-- @proxy-query="proxyQueryEvent"
    @proxy-delete="proxyDeleteEvent"
    @proxy-save="proxySaveEvent" -->
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #vxe-buttons>
        <vxe-button type="submit" status="primary">
          搜索
        </vxe-button>
        <vxe-button type="reset">
          重置
        </vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script>
import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'

export default {
  data() {
    return {
      gridOptions: {
        border: true,
        showHeaderOverflow: true,
        showOverflow: true,
        keepSource: true,
        id: 'full_edit_1',
        height: 600,
        // rowId: 'id',
        rowConfig: {
          isHover: true,
          keyField: 'id',
        },
        columnConfig: {
          resizable: true,
        },
        customConfig: {
          storage: true,
          checkMethod: this.checkColumnMethod,
        },
        printConfig: {
          columns: [
            { field: 'name' },
            { field: 'email' },
            { field: 'nickname' },
            { field: 'age' },
            { field: 'amount' },
          ],
        },
        sortConfig: {
          trigger: 'cell',
          remote: true,
        },
        filterConfig: {
          remote: true,
        },
        pagerConfig: {
          pageSize: 10,
          pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
        },
        formConfig: {
          titleWidth: 100,
          titleAlign: 'right',
          items: [
            {
              field: 'name',
              title: 'app.body.label.name',
              span: 8,
              titlePrefix: { message: 'app.body.valid.rName', icon: 'vxe-icon-info-circle-fill' },
              itemRender: { name: 'VxeInput', props: { placeholder: '请输入名称' } },
            },
            {
              field: 'email',
              title: '邮件',
              span: 8,
              titlePrefix: {
                useHTML: true,
                message: '点击链接：<a class="link" href="https://vxetable.cn" target="_blank">vxe-table官网</a>',
                icon: 'vxe-icon-question-circle-fill',
              },
              itemRender: { name: 'VxeInput', props: { placeholder: '请输入邮件' } },
            },
            {
              field: 'nickname',
              title: '昵称',
              span: 8,
              itemRender: { name: 'VxeInput', props: { placeholder: '请输入昵称' } },
            },
            {
              field: 'role',
              title: '角色',
              span: 8,
              folding: true,
              itemRender: { name: 'VxeInput', props: { placeholder: '请输入角色' } },
            },
            {
              field: 'sex',
              title: '性别',
              span: 8,
              folding: true,
              titleSuffix: { message: '注意，必填信息！', icon: 'vxe-icon-info-circle-fill' },
              itemRender: { name: 'VxeSelect', options: [] },
            },
            {
              field: 'age',
              title: '年龄',
              span: 8,
              folding: true,
              itemRender: { name: 'VxeInput', props: { type: 'number', min: 1, max: 120, placeholder: '请输入年龄' } },
            },
            {
              span: 24,
              align: 'center',
              collapseNode: true,
              slots: {
                default: 'vxe-buttons',
              },
              itemRender: {
                name: 'VxeButtons',
                children: [
                  { props: { type: 'submit', content: 'app.body.label.search', status: 'primary' } },
                  { props: { type: 'reset', content: 'app.body.label.reset' } },
                ],
              },
            },
          ],
        },
        toolbarConfig: {
          buttons: [
            { code: 'insert_edit', name: '新增', icon: 'vxe-icon-square-plus' },
            { code: 'delete', name: '直接删除', icon: 'vxe-icon-delete' },
            { code: 'mark_cancel', name: '删除/取消', icon: 'vxe-icon-delete' },
            { code: 'save', name: 'app.body.button.save', icon: 'vxe-icon-save', status: 'success' },
          ],
          refresh: true,
          import: true,
          export: true,
          print: true,
          zoom: true,
          custom: true,
        },
        proxyConfig: {
          seq: true, // 启用动态序号代理，每一页的序号会根据当前页数变化
          sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
          filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
          form: true, // 启用表单代理，当点击表单提交按钮时会自动触发 reload 行为
          // 对应响应结果 { result: [], page: { total: 100 } }
          props: {
            result: 'result', // 配置响应结果列表字段
            total: 'page.total', // 配置响应结果总页数字段
          },
          // 只接收Promise，具体实现自由发挥
          ajax: {
            // 当点击工具栏查询按钮或者手动提交指令 query或reload 时会被触发
            query: ({ page, sorts, filters, form }) => {
              const queryParams = Object.assign({}, form)
              // 处理排序条件
              const firstSort = sorts[0]
              if (firstSort) {
                queryParams.sort = firstSort.field
                queryParams.order = firstSort.order
              }
              // 处理筛选条件
              filters.forEach(({ field, values }) => {
                queryParams[field] = values.join(',')
              })
              return fetch(
                `${this.serveApiUrl}/api/pub/page/list/${page.pageSize}/${page.currentPage}`,
                queryParams,
              ).then(response => response.json())
            },
            // 当点击工具栏删除按钮或者手动提交指令 delete 时会被触发
            delete: ({ body }) => {
              return fetch(`${this.serveApiUrl}/api/pub/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
              }).then(response => response.json())
            },
            // 当点击工具栏保存按钮或者手动提交指令 save 时会被触发
            save: ({ body }) => {
              return fetch(`${this.serveApiUrl}/api/pub/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
              }).then(response => response.json())
            },
          },
        },
        columns: [
          { type: 'checkbox', title: 'ID', width: 120 },
          {
            field: 'name',
            title: 'Name',
            sortable: true,
            titlePrefix: { message: '名称必须填写！' },
            editRender: { name: 'input', attrs: { placeholder: '请输入名称' } },
          },
          {
            field: 'role',
            title: 'Role',
            sortable: true,
            titlePrefix: {
              useHTML: true,
              content: '点击链接：<a class="link" href="https://vxetable.cn" target="_blank">vxe-table官网</a>',
            },
            filters: [
              { label: '前端开发', value: '前端' },
              { label: '后端开发', value: '后端' },
              { label: '测试', value: '测试' },
              { label: '程序员鼓励师', value: '程序员鼓励师' },
            ],
            filterMultiple: false,
            editRender: { name: 'input', attrs: { placeholder: '请输入角色' } },
          },
          {
            field: 'email',
            title: 'Email',
            width: 160,
            editRender: { name: 'VxeInput', props: { placeholder: '请输入邮件' } },
          },
          { field: 'nickname', title: 'Nickname', editRender: { name: 'input', attrs: { placeholder: '请输入昵称' } } },
          {
            field: 'sex',
            title: 'Sex',
            filters: [
              { label: '男', value: '1' },
              { label: '女', value: '0' },
            ],
            editRender: { name: 'VxeSelect', options: [], props: { placeholder: '请选择性别' } },
          },
          {
            field: 'age',
            title: 'Age',
            visible: false,
            sortable: true,
            editRender: { name: 'VxeInput', props: { type: 'number', min: 1, max: 120 } },
          },
          {
            field: 'amount',
            title: 'Amount',
            formatter: this.formatAmount,
            editRender: { name: 'VxeInput', props: { type: 'float', digits: 2, placeholder: '请输入数值' } },
          },
          {
            field: 'updateDate',
            title: 'Update Date',
            width: 160,
            visible: false,
            sortable: true,
            formatter: this.formatDate,
          },
          {
            field: 'createDate',
            title: 'Create Date',
            width: 160,
            visible: false,
            sortable: true,
            formatter: this.formatDate,
          },
        ],
        importConfig: {
          remote: true,
          importMethod: this.importMethod,
          types: ['xlsx'],
          modes: ['insert'],
        },
        exportConfig: {
          remote: true,
          exportMethod: this.exportMethod,
          types: ['xlsx'],
          modes: ['current', 'selected', 'all'],
        },
        checkboxConfig: {
          labelField: 'id',
          reserve: true,
          highlight: true,
          range: true,
        },
        editRules: {
          name: [
            { required: true, message: 'app.body.valid.rName' },
            { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' },
          ],
          email: [{ required: true, message: '邮件必须填写' }],
          role: [{ required: true, message: '角色必须填写' }],
        },
        editConfig: {
          trigger: 'click',
          mode: 'row',
          showStatus: true,
        },
      },
      serveApiUrl: '/demo',
    }
  },
  created() {
    this.findSexList()
  },
  methods: {
    findSexList() {
      setTimeout(() => {
        const sexList = [
          { label: '', value: '' },
          { label: '男', value: '1' },
          { label: '女', value: '0' },
        ]
        // 异步更新下拉选项
        this.sexList = sexList
        const $grid = this.$refs.xGrid
        if ($grid) {
          const sexColumn = $grid.getColumnByField('sex')
          sexColumn.editRender.options = sexList
          const sexItem = $grid.getFormItems(4)
          sexItem.itemRender.options = sexList
        }
      }, 100)
    },
    formatAmount({ cellValue }) {
      return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: 2 })}` : ''
    },
    formatDate({ cellValue }) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
    },
    checkColumnMethod({ column }) {
      if (['nickname', 'role'].includes(column.field)) {
        return false
      }
      return true
    },
    // 自定义服务端导入
    importMethod({ file }) {
      // 处理表单
      const formBody = new FormData()
      formBody.append('file', file)
      // 上传文件
      return fetch(`${this.serveApiUrl}/api/pub/import`, { method: 'POST', body: formBody })
        .then(response => response.join())
        .then((data) => {
          const $grid = this.$refs.xGrid
          VXETable.modal.message({ content: `成功导入 ${data.result.insertRows} 条记录！`, status: 'success' })
          // 导入完成，刷新表格
          $grid.commitProxy('query')
        })
        .catch(() => {
          VXETable.modal.message({ content: '导入失败，请检查数据是否正确！', status: 'error' })
        })
    },
    // 自定义服务端导出
    exportMethod({ options }) {
      const $grid = this.$refs.xGrid
      const proxyInfo = $grid.getProxyInfo()
      // 传给服务端的参数
      const body = {
        filename: options.filename,
        sheetName: options.sheetName,
        isHeader: options.isHeader,
        original: options.original,
        mode: options.mode,
        pager: proxyInfo.pager,
        ids: options.mode === 'selected' ? options.data.map(item => item.id) : [],
        fields: options.columns.map((column) => {
          return {
            field: column.field,
            title: column.title,
          }
        }),
      }
      // 开始服务端导出
      return fetch(`${this.serveApiUrl}/api/pub/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then((data) => {
          if (data.id) {
            VXETable.modal.message({ content: '导出成功，开始下载', status: 'success' })
            // 读取路径，请求文件
            fetch(`${this.serveApiUrl}/api/pub/export/download/${data.id}`)
              .then(response => response.blob())
              .then((blob) => {
                // 开始下载
                VXETable.saveFile({ filename: '导出数据', type: 'xlsx', content: blob })
              })
          }
        })
        .catch(() => {
          VXETable.modal.message({ content: '导出失败！', status: 'error' })
        })
    },
  },
}
</script>
