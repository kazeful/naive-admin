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
     * @typedef {Array<FormOption>} FormOptions
     * @typedef {object} FormOption
     * @property {boolean} show - 是否显示表单
     * @property {string|Component} is - 传入时使用vue内置组件<component is="" />渲染
     * @property {string} type - 指定预设表单类型 详见NFormValueItem.vue
     * @property {Function} initialize - 初始化函数，用于一些需要自定义的操作
     * @property {(parent, model) => FormOption} next - 返回下级表单的函数，主要用于动态表单
     * @property {object} formItem - el-form-item组件的attributes
     * @property {object} col - el-col组件的attributes
     * @property {object} input - 组件的attributes listeners
     */
    /**
     * @type FormOptions
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
