<template>
  <!-- input -->
  <el-input
    v-if="formData.formType === 'input'"
    v-model="returnFormValue[formData.code]"
    v-bind="realFormData"
    v-on="listeners"
  />

  <!-- textarea -->
  <el-input
    v-else-if="formData.formType === 'textarea'"
    v-model="returnFormValue[formData.code]"
    type="textarea"
    v-bind="realFormData"
    v-on="listeners"
  />

  <!-- date -->
  <el-date-picker
    v-else-if="formData.formType === 'date'"
    v-model="returnFormValue[formData.code]"
    v-bind="realFormData"
    v-on="listeners"
  />

  <!-- select -->
  <el-select
    v-else-if="formData.formType === 'select'"
    v-model="returnFormValue[formData.code]"
    class="w-full"
    v-bind="realFormData"
    v-on="listeners"
  >
    <el-option
      v-for="item in formData.data"
      :key="item[keyField]"
      :label="item[labelField]"
      :value="item[keyField]"
    />
  </el-select>

  <!-- treeSelect -->
  <Treeselect
    v-else-if="formData.formType === 'treeSelect'"
    v-model="returnFormValue[formData.code]"
    font="leading-normal"
    p="y-2px"
    v-bind="realFormData"
    v-on="listeners"
  />

  <!-- radio -->
  <el-radio-group
    v-else-if="formData.formType === 'radio'"
    v-model="returnFormValue[formData.code]"
  >
    <el-radio v-for="item in formData.data" :key="item[keyField]" :label="item[keyField]">
      {{ item[labelField] }}
    </el-radio>
  </el-radio-group>

  <!-- checkbox -->
  <el-checkbox-group
    v-else-if="formData.formType === 'checkbox'"
    v-model="returnFormValue[formData.code]"
  >
    <el-checkbox
      v-for="item in formData.data"
      :key="item[keyField]"
      :type="item.code"
      :label="item[keyField]"
    >
      {{ item[labelField] }}
    </el-checkbox>
  </el-checkbox-group>

  <!-- switch -->
  <el-switch v-else-if="formData.formType === 'switch'" v-model="returnFormValue[formData.code]" />
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { omitBy, pickBy, startsWith } from 'lodash-es'

export default {
  name: 'NFormItem',
  components: {
    Treeselect,
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
    formValue: {
      type: Object,
      required: true,
    },
    labelField: {
      type: String,
      default: 'label',
    },
    keyField: {
      type: String,
      default: 'value',
    },
  },
  computed: {
    returnFormValue() {
      return this.formValue
    },
    realFormData() {
      return omitBy(this.formData, (_, key) => startsWith(key, 'on'))
    },
    listeners() {
      return pickBy(this.formData, (_, key) => startsWith(key, 'on'))
    },
  },
}
</script>
