<template>
  <div p="5">
    <NForm
      :form-options="formOptions"
      :model="model"
      :rules="rules"
    >
      <template #customLabel_label>
        自定义标签
      </template>
      <template #customForm="{ data }">
        <el-input v-model="model[data.prop]" placeholder="自定义表单" />
      </template>
    </NForm>
    {{ model }}
  </div>
</template>

<script>
import { formOptions, model } from '../options/formOptions'
import NForm from '@/components/NForm'

export default {
  components: {
    NForm,
  },
  data() {
    return {
      formOptions,
      model,
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
