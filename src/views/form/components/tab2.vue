<template>
  <div p="5">
    <NForm
      :form-options="formOptions"
      :model="formValue"
      :rules="rules"
    >
      <template #customLabel_label>
        自定义标签
      </template>
      <template #customForm="{ data }">
        <el-input v-model="formValue[data.code]" placeholder="自定义表单" />
      </template>
    </NForm>
    {{ formValue }}
  </div>
</template>

<script>
import { formOptions, formValue } from '../options/formOptions'
import NForm from '@/components/NForm'

export default {
  components: {
    NForm,
  },
  data() {
    return {
      formOptions,
      formValue,
      rules: {
        input: [
          {
            required: true,
            message: '输入框不能为空',
            trigger: 'blur',
          },
        ],
        select: [
          {
            required: true,
            message: '下拉框不能为空',
            trigger: 'change',
          },
        ],
      },
    }
  },
}
</script>
