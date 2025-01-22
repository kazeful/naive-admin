<script>
import NFormValueItem from './NFormValueItem.vue'

export default {
  name: 'NFormItem',
  functional: true,
  props: {
    formOption: Object,
    model: Object,
    defaultColSpan: Number,
  },
  render(h, { props, scopedSlots: rootScopedSlots }) {
    const { formOption, model, defaultColSpan } = props

    const { formItem, col } = formOption

    const scopedSlots = {
      label: () => rootScopedSlots[`${formItem.prop}_label`] && rootScopedSlots[`${formItem.prop}_label`](formOption),
      default: () =>
        rootScopedSlots[formItem.prop]
          ? rootScopedSlots[formItem.prop](formOption)
          : h(NFormValueItem, { props: { model, formOption } }),
    }

    return (
      formOption.if !== false && [
        <el-col
          props={{ ...col, span: col?.span ?? defaultColSpan }}
          style={{ display: formOption.show !== false ? null : 'none' }}
        >
          <el-form-item key={formItem.prop} props={{ ...formItem }} scopedSlots={scopedSlots} />
        </el-col>,
        formOption.children?.length
        && formOption.children.map(child => (
          <NFormItem
            props={{
              formOption: typeof child === 'function' ? child(formOption, model) : child,
              model,
              defaultColSpan,
            }}
            scopedSlots={rootScopedSlots}
          />
        )),
      ]
    )
  },
}
</script>
