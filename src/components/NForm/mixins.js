export default {
  created() {
    const setDef = (option) => {
      if (this.$attrs.model[option.formItem.prop] === undefined) {
        let def = ''
        if (option.type === 'checkbox')
          def = []

        if (option.type === 'switch')
          def = false

        if (option.type === 'select')
          def = option.input.multiple ? [] : ''

        if (option.type === 'treeselect')
          def = option.input.multiple ? [] : null

        this.$set(this.$attrs.model, option.formItem.prop, def) // For vue2
      }
      if (option.next)
        setDef(option.next(option, this.$attrs.model))
    }
    this.formOptions.forEach(setDef)
  },
}
