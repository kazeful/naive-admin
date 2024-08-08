<script>
import NFormValueItem from './NFormValueItem.vue'

export default {
  name: 'NFormItem',
  functional: true,
  props: {
    formOption: Object,
    model: Object,
    columnlayout: Number,
  },
  render(h, { props, scopedSlots: rootScopedSlots }) {
    const { formOption, model, columnlayout } = props

    const { formItem, col } = formOption

    const scopedSlots = {
      label: () => rootScopedSlots[`${formItem.prop}_label`] && rootScopedSlots[`${formItem.prop}_label`](formOption),
      default: () => rootScopedSlots[formItem.prop] ? rootScopedSlots[formItem.prop](formOption) : h(NFormValueItem, { props: { model, formOption } }),
    }

    return [
      formOption.show !== false
      && h('el-col', { props: { ...col, span: col?.span || 24 / columnlayout } }, [h('el-form-item', { props: { ...formItem }, scopedSlots })]),
      formOption.next && h('NFormItem', { props: { formOption: formOption.next(formOption, model), model, columnlayout }, scopedSlots: rootScopedSlots }),
    ]
  },
}
</script>
