<template>
  <el-form ref="ruleForm" :model="model" :label-width="labelWidth" v-bind="$attrs" v-on="$listeners">
    <el-row>
      <el-col v-for="(formData, index) in formDataList" :key="index" :span="formData.span || 24 / columnlayout">
        <el-form-item p="x-8" v-bind="pick(formData, formItemProps)">
          <template #label>
            <slot :name="`${formData.prop}_label`" :data="formData">
              {{ formData.label }}
            </slot>
          </template>
          <template #default>
            <slot :name="formData.prop" :data="formData">
              <NFormItem :model="computedModel" :form-data="omit(formData, formItemProps)" />
            </slot>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { omit, pick } from 'lodash-es'
import NFormItem from './NFormItem.vue'

export default {
  name: 'NForm',
  components: {
    NFormItem,
  },
  inheritAttrs: false,
  props: {
    // 支持的字段：span + FormItem的props + inputType对应表单的props/events + class/style
    formDataList: {
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
    columnlayout: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      formItemProps: ['prop', 'label', 'labelWidth', 'required', 'rules', 'error', 'showMessage', 'inlineMessage', 'size'],
    }
  },
  computed: {
    computedModel() {
      return this.model
    },
  },
  methods: {
    pick,
    omit,
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
  },
}
</script>
