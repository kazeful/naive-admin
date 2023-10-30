export default {
  created() {
    const setDef = (option) => {
      if (this.model[option.prop] === undefined) {
        let def = ''
        if (option.type === 'checkbox')
          def = []

        if (option.type === 'switch')
          def = false

        if (['select', 'treeselect'].includes(option.type))
          def = option.props.multiple ? [] : ''

        this.$set(this.model, option.prop, def) // For vue2
      }
      if (option.next)
        setDef(option.next(option, this.model))
    }
    this.formOptions.forEach(setDef)
  },
}
