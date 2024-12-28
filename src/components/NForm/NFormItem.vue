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
        h(
          'el-col',
          {
            props: { ...col, span: col?.span ?? defaultColSpan },
            style: { display: formOption.show !== false ? 'initial' : 'none' },
          },
          [h('el-form-item', { props: { ...formItem }, scopedSlots, key: formItem.prop })]
        ),
        formOption.children?.length &&
          formOption.children.map((child) =>
            h('NFormItem', {
              props: {
                formOption: typeof child === 'function' ? child(formOption, model) : child,
                model,
                defaultColSpan,
              },
              scopedSlots: rootScopedSlots,
            })
          ),
      ]
    )
  },
}
</script>
