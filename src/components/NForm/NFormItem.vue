<template>
  <!-- input -->
  <el-input
    v-if="formType === 'input'"
    v-model="computedModel[inputProp]"
    v-bind="attrs"
    v-on="listeners"
  />

  <!-- textarea -->
  <el-input
    v-else-if="formType === 'textarea'"
    v-model="computedModel[inputProp]"
    type="textarea"
    v-bind="attrs"
    v-on="listeners"
  />

  <!-- date -->
  <el-date-picker
    v-else-if="formType === 'date'"
    v-model="computedModel[inputProp]"
    v-bind="attrs"
    v-on="listeners"
  />

  <!-- select -->
  <el-select
    v-else-if="formType === 'select'"
    v-model="computedModel[inputProp]"
    class="w-full"
    v-bind="attrs"
    v-on="listeners"
  >
    <el-option
      v-for="item in formData.dict"
      :key="item[valueField]"
      :label="item[labelField]"
      :value="item[valueField]"
    />
  </el-select>

  <!-- treeSelect -->
  <Treeselect
    v-else-if="formType === 'treeSelect'"
    v-model="computedModel[inputProp]"
    font="leading-normal"
    p="y-2px"
    v-bind="attrs"
    v-on="listeners"
  />

  <!-- radio -->
  <el-radio-group
    v-else-if="formType === 'radio'"
    v-model="computedModel[inputProp]"
  >
    <el-radio v-for="item in formData.dict" :key="item[valueField]" :label="item[valueField]">
      {{ item[labelField] }}
    </el-radio>
  </el-radio-group>

  <!-- checkbox -->
  <el-checkbox-group
    v-else-if="formType === 'checkbox'"
    v-model="computedModel[inputProp]"
  >
    <el-checkbox
      v-for="item in formData.dict"
      :key="item[valueField]"
      :type="item.prop"
      :label="item[valueField]"
    >
      {{ item[labelField] }}
    </el-checkbox>
  </el-checkbox-group>

  <!-- switch -->
  <el-switch v-else-if="formType === 'switch'" v-model="computedModel[inputProp]" />

  <!-- div -->
  <div
    v-else-if="formType === 'div'"
    v-bind="attrs"
    v-on="listeners"
    v-text="computedModel[inputProp]"
  />
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import { omitBy, pickBy, startsWith } from 'lodash-es'
import { colProps, extraProps, formItemProps } from './option'

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
    attrs() {
      return omitBy(this.formData, (_, key) => {
        return startsWith(key, 'on') || [...colProps, ...formItemProps, ...extraProps].includes(key)
      })
    },
    listeners() {
      const listeners = Object.create(null)
      const attrs = pickBy(this.formData, (_, key) => startsWith(key, 'on'))
      Object.keys(attrs).forEach((key) => {
        listeners[key.slice(2).toLocaleLowerCase()] = attrs[key]
      })
      return listeners
    },
    inputType() {
      return this.formData.inputType
    },
    inputProp() {
      return this.formData.prop
    },
    inputInit() {
      return this.formData.init
    },
  },
  watch: {
    inputType: {
      handler() {
        this.inputInit && this.inputInit()
      },
      immediate: true,
    },
  },
}
</script>
