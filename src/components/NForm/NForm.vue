<template>
  <el-form ref="ruleForm" :model="model" :label-width="labelWidth" v-bind="$attrs" v-on="$listeners">
    <el-row>
      <el-col v-for="(formData, index) in formOptions" :key="index" :span="formData.span || 24 / columnlayout">
        <el-form-item p="x-8" v-bind="formData">
          <template #label>
            <slot :name="`${formData.prop}_label`" :data="formData">
              {{ formData.label }}
            </slot>
          </template>
          <template #default>
            <slot :name="formData.prop" :data="formData">
              <NFormItem :model="model" :form-data="formData" />
            </slot>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import NFormItem from './NFormItem.vue'

export default {
  name: 'NForm',
  components: {
    NFormItem,
  },
  inheritAttrs: false,
  props: {
    // 支持的字段：span + inputType + FormItem的props + inputType对应表单的props/events + class/style
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
    columnlayout: {
      type: Number,
      default: 3,
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
  },
}
</script>
