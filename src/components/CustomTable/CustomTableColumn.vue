<script lang="jsx">
export default {
  name: 'CustomTableColumn',
  functional: true,
  render(_, { props, scopedSlots }) {
    function RenderCustomTableColumn(column, slots) {
      const scopedSlots = {
        default: (scope) => {
          if (column.children)
            return column.children.map(child => RenderCustomTableColumn(child, slots))
          if (column.render)
            return column.render(scope)
          if (slots[column.prop])
            return slots[column.prop](scope)
          return scope.row[column.prop]
        },
        header: (scope) => {
          if (column.headerRender)
            return column.headerRender(scope)
          if (slots[`${column.prop}Header`])
            return slots[`${column.prop}Header`](scope)
          return column.label
        },
      }

      return <el-table-column {...{ attrs: { ...column, align: column.align ?? 'center' } }} scopedSlots={scopedSlots} />
    }

    return RenderCustomTableColumn(props, scopedSlots)
  },
}
</script>
