<script>
export default {
  name: 'NTableColumn',
  functional: true,
  render(h, { props: column, scopedSlots }) {
    const elTableColumnScopedSlots = {}

    if (column.renderCell)
      elTableColumnScopedSlots.default = scope => column.renderCell(h, scope)

    if (scopedSlots[column.prop])
      elTableColumnScopedSlots.default = scope => scopedSlots[column.prop](scope)

    // FIXME not work
    // if (column.children)
    //   elTableColumnScopedSlots.default = () => column.children.map(column => <NTableColumn attrs={column} scopedSlots={scopedSlots} />)

    if (scopedSlots[`${column.prop}Header`])
      elTableColumnScopedSlots.header = scope => scopedSlots[`${column.prop}Header`](scope)

    return <el-table-column
      attrs={{
        ...column,
        align: column.align ?? 'center',
        showOverflowTooltip: column.showOverflowTooltip ?? true,
      }}
      scopedSlots={elTableColumnScopedSlots}
    >
      {column.children?.map(column => <NTableColumn attrs={column} scopedSlots={scopedSlots} />)}
    </el-table-column>
  },
}
</script>
