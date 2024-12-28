<template>
  <el-form
    ref="elForm"
    v-bind="$attrs"
    :label-width="labelWidth"
    :validate-on-rule-change="validateOnRuleChange"
    v-on="$listeners"
  >
    <el-row v-bind="{ gutter: 16, ...rowProps }">
      <NFormItem
        v-for="formOption in formOptions" :key="formOption.prop"
        :form-option="formOption" :model="$attrs.model" :default-col-span="defaultColSpan"
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
import { constant } from 'lodash-es'
import vue2 from './mixins'
import NFormItem from './NFormItem.vue'

export default {
  name: 'NForm',
  components: {
    NFormItem,
  },
  mixins: [vue2],
  inheritAttrs: false,
  props: {
    /**
     * @typedef {FormOption[]} FormOptions
     * @typedef {object} FormOption
     * @property {boolean} if - 是否渲染表单
     * @property {boolean} show - 是否显示表单
     * @property {string|Component} is - 传入时使用vue内置组件<component is="" />渲染
     * @property {string} type - 指定预设表单类型 详见NFormValueItem.vue
     * @property {object} col - el-col组件的attributes
     * @property {object} formItem - el-form-item组件的attributes
     * @property {object} input - 组件的attributes listeners
     * @property {Function} initialize - 初始化函数，用于一些需要自定义的操作
     * @property {(FormOption | (parent, model) => FormOption)[]} children - 由下级表单配置或返回下级表单配置的函数组成的数组，主要用于动态表单
     */
    /**
     * @type FormOptions
     */
    formOptions: {
      type: Array,
      required: true,
    },
    labelWidth: {
      type: String,
      default: 'auto',
    },
    validateOnRuleChange: Boolean,
    rowProps: {
      type: Object,
      default: constant({}),
    },
    defaultColSpan: {
      type: Number,
      default: 8,
      validate(val) {
        return val >= 0 && val <=24
      },
    },
  },
  methods: {
    validate(...arg) {
      this.$refs.elForm.validate(...arg)
    },
    validateField(...arg) {
      this.$refs.elForm.validateField(...arg)
    },
    resetFields() {
      this.$refs.elForm.resetFields()
    },
    clearValidate(...arg) {
      this.$refs.elForm.clearValidate(...arg)
    },
  },
}
</script>
