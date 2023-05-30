<template>
  <!-- input -->
  <el-input
    v-if="formType === 'input'"
    v-model="computedModel[formData.prop]"
    v-bind="realFormData"
    v-on="listeners"
  />

  <!-- textarea -->
  <el-input
    v-else-if="formType === 'textarea'"
    v-model="computedModel[formData.prop]"
    type="textarea"
    v-bind="realFormData"
    v-on="listeners"
  />

  <!-- date -->
  <el-date-picker
    v-else-if="formType === 'date'"
    v-model="computedModel[formData.prop]"
    v-bind="realFormData"
    v-on="listeners"
  />

  <!-- select -->
  <el-select
    v-else-if="formType === 'select'"
    v-model="computedModel[formData.prop]"
    class="w-full"
    v-bind="realFormData"
    v-on="listeners"
  >
    <el-option
      v-for="item in formData.data"
      :key="item[valueField]"
      :label="item[labelField]"
      :value="item[valueField]"
    />
  </el-select>

  <!-- treeSelect -->
  <Treeselect
    v-else-if="formType === 'treeSelect'"
    v-model="computedModel[formData.prop]"
    font="leading-normal"
    p="y-2px"
    v-bind="realFormData"
    v-on="listeners"
  />

  <!-- radio -->
  <el-radio-group
    v-else-if="formType === 'radio'"
    v-model="computedModel[formData.prop]"
  >
    <el-radio v-for="item in formData.data" :key="item[valueField]" :label="item[valueField]">
      {{ item[labelField] }}
    </el-radio>
  </el-radio-group>

  <!-- checkbox -->
  <el-checkbox-group
    v-else-if="formType === 'checkbox'"
    v-model="computedModel[formData.prop]"
  >
    <el-checkbox
      v-for="item in formData.data"
      :key="item[valueField]"
      :type="item.prop"
      :label="item[valueField]"
    >
      {{ item[labelField] }}
    </el-checkbox>
  </el-checkbox-group>

  <!-- switch -->
  <el-switch v-else-if="formType === 'switch'" v-model="computedModel[formData.prop]" />
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
    model: {
      type: Object,
      required: true,
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
    computedModel() {
      return this.model
    },
    realFormData() {
      return omitBy(this.formData, (_, key) => startsWith(key, 'on'))
    },
    listeners() {
      return pickBy(this.formData, (_, key) => startsWith(key, 'on'))
    },
    formType() {
      return this.formData.formType
    },
  },
}
</script>
