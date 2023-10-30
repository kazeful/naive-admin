<template>
  <el-form
    ref="elForm"
    v-bind="pickByFormProps()"
    :model="model"
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
import vue2 from './mixins'

export default {
  name: 'NForm',
  components: {
    NFormItem,
  },
  mixins: [vue2],
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
