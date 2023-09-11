<template>
  <el-form
    ref="elForm"
    v-bind="pickByFormProps()"
    :model="model"
    :rules="rules"
    :label-width="labelWidth"
    v-on="$listeners"
  >
    <el-row v-bind="pickByRowProps()" :gutter="gutter">
      <NFormItem
        v-for="formOption in formOptions" :key="formOption.prop"
        :form-option="formOption" :model="model" :columnlayout="columnlayout"
      >
        <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </NFormItem>
      <slot />
    </el-row>
  </el-form>
</template>

<script>
import { pick } from 'lodash-es'
import { formProps, rowProps } from './options'
import NFormItem from './NFormItem.vue'

export default {
  name: 'NForm',
  components: {
    NFormItem,
  },
  inheritAttrs: false,
  props: {
    /**
     * 支持的字段
     * show/type/initialize/next/props(type对应表单的props/events/class/style)
     * Col和FormItem组件的props
     */
    formOptions: {
      type: Array,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
    rules: Object,
    labelWidth: {
      type: String,
      default: '100px',
    },
    gutter: {
      type: Number,
      default: 16,
    },
    columnlayout: {
      type: Number,
      default: 3,
      validate(val) {
        return [1, 2, 3, 4, 6, 8, 12, 24].includes(val)
      },
    },
  },
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
    this.formOptions.forEach((option) => {
      setDef(option)
    })
  },
  methods: {
    validate(...arg) {
      this.$refs.ruleForm.validate(...arg)
    },
    validateField(...arg) {
      this.$refs.ruleForm.validateField(...arg)
    },
    resetFields() {
      this.$refs.ruleForm.resetFields()
    },
    clearValidate(...arg) {
      this.$refs.ruleForm.clearValidate(...arg)
    },
    pickByFormProps() {
      return pick(this.$attrs, formProps)
    },
    pickByRowProps() {
      return pick(this.$attrs, rowProps)
    },
  },
}
</script>
