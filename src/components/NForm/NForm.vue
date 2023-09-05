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
      <el-col
        v-for="(formData, index) in realFormOptions" :key="index"
        v-bind="pickByColProps(formData)"
        :span="formData.span || 24 / columnlayout"
      >
        <el-form-item v-bind="pickByFormItemProps(formData)">
          <template #label>
            <slot :name="`${formData.prop}_label`" :data="formData">
              {{ formData.label }}
            </slot>
          </template>
          <template #default>
            <slot :name="formData.prop" :data="formData">
              <NFormItem
                :model="model"
                :form-data="formData"
                :label-field="labelField"
                :value-field="valueField"
              />
            </slot>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { pick } from 'lodash-es'
import { colProps, formItemProps, formProps, rowProps } from './options'
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
     * show/inputType
     * Col的props
     * FormItem的props
     * inputType对应表单的props/events
     * class/style
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
    labelField: {
      type: String,
      default: 'label',
    },
    valueField: {
      type: String,
      default: 'value',
    },
  },
  computed: {
    realFormOptions() {
      return this.formOptions.filter(item => item.show !== false)
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
    pickByColProps(formData) {
      return pick(formData, colProps)
    },
    pickByFormItemProps(formData) {
      return pick(formData, formItemProps)
    },
  },
}
</script>
