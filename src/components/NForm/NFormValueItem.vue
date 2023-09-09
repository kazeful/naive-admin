<!-- eslint-disable vue/no-mutating-props -->
<template>
  <!-- input -->
  <el-input
    v-if="formType === 'input'"
    v-model="model[formProp]"
    v-bind="attrs"
    v-on="listeners"
  />

  <!-- textarea -->
  <el-input
    v-else-if="formType === 'textarea'"
    v-model="model[formProp]"
    type="textarea"
    v-bind="attrs"
    v-on="listeners"
  />

  <!-- date -->
  <el-date-picker
    v-else-if="formType === 'date'"
    v-model="model[formProp]"
    v-bind="attrs"
    v-on="listeners"
  />

  <!-- select -->
  <el-select
    v-else-if="formType === 'select'"
    v-model="model[formProp]"
    class="w-full"
    v-bind="attrs"
    v-on="listeners"
  >
    <el-option
      v-for="item in formOption.props.options"
      :key="item[valueField]"
      :label="item[labelField]"
      :value="item[valueField]"
    />
  </el-select>

  <!-- treeselect -->
  <Treeselect
    v-else-if="formType === 'treeselect'"
    v-model="model[formProp]"
    font="leading-normal"
    p="y-2px"
    v-bind="attrs"
    v-on="listeners"
  />

  <!-- radio -->
  <el-radio-group
    v-else-if="formType === 'radio'"
    v-model="model[formProp]"
  >
    <el-radio v-for="item in formOption.props.options" :key="item[valueField]" :label="item[valueField]">
      {{ item[labelField] }}
    </el-radio>
  </el-radio-group>

  <!-- checkbox -->
  <el-checkbox-group
    v-else-if="formType === 'checkbox'"
    v-model="model[formProp]"
  >
    <el-checkbox
      v-for="item in formOption.props.options"
      :key="item[valueField]"
      :type="item.prop"
      :label="item[valueField]"
    >
      {{ item[labelField] }}
    </el-checkbox>
  </el-checkbox-group>

  <!-- switch -->
  <el-switch v-else-if="formType === 'switch'" v-model="model[formProp]" />

  <!-- div -->
  <div
    v-else-if="formType === 'div'"
    v-bind="attrs"
    v-on="listeners"
    v-text="model[formProp]"
  />
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import { omitBy, pickBy } from 'lodash-es'

export default {
  name: 'NFormItem',
  components: {
    Treeselect,
  },
  inject: {
    labelField: {
      type: String,
      default: 'label',
    },
    valueField: {
      type: String,
      default: 'value',
    },
  },
  props: {
    formOption: Object,
    model: Object,
  },
  computed: {
    formType() {
      return this.formOption.type
    },
    formProp() {
      return this.formOption.prop
    },
    formProps() {
      return this.formOption.props
    },
    formInitialize() {
      return this.formOption.initialize
    },
    attrs() {
      return omitBy(this.formProps, (_, key) => {
        return key.startsWith('on')
      })
    },
    listeners() {
      const listeners = Object.create(null)
      const attrs = pickBy(this.formProps, (_, key) => key.startsWith('on'))
      Object.keys(attrs).forEach((key) => {
        listeners[key.slice(2).toLocaleLowerCase()] = attrs[key]
      })
      return listeners
    },
  },
  watch: {
    formType: {
      handler() {
        this.formInitialize && this.formInitialize(this.formOption, this.model)
      },
      immediate: true,
    },
  },
}
</script>
