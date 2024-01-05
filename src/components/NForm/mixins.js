export default {
  created() {
    const setDef = (option) => {
      if (this.model[option.prop] === undefined) {
        let def = ''
        if (option.type === 'checkbox')
          def = []

        if (option.type === 'switch')
          def = false

        if (option.type === 'select')
          def = option.props.multiple ? [] : ''

        if (option.type === 'treeselect')
          def = option.props.multiple ? [] : null

        this.$set(this.model, option.prop, def) // For vue2
      }
      if (option.next)
        setDef(option.next(option, this.model))
    }
    this.formOptions.forEach(setDef)
  },
}
