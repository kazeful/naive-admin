<!-- eslint-disable vue/no-mutating-props -->
<template>
  <component
    :is="formIs"
    v-if="formIs"
    v-model="model[formItemProp]"
    v-bind="attrs"
    v-on="listeners"
  />

  <el-input
    v-else-if="formType === 'input'"
    v-model="model[formItemProp]"
    v-bind="attrs"
    v-on="listeners"
  />

  <el-input
    v-else-if="formType === 'textarea'"
    v-model="model[formItemProp]"
    type="textarea"
    v-bind="attrs"
    v-on="listeners"
  />

  <el-date-picker
    v-else-if="formType === 'date'"
    v-model="model[formItemProp]"
    v-bind="attrs"
    v-on="listeners"
  />

  <el-select
    v-else-if="formType === 'select'"
    v-model="model[formItemProp]"
    class="w-full"
    v-bind="attrs"
    v-on="listeners"
  >
    <el-option
      v-for="item in formOption.input.options"
      :key="item[valueField]"
      :label="item[labelField]"
      :value="item[valueField]"
    />
  </el-select>

  <Treeselect
    v-else-if="formType === 'treeselect'"
    v-model="model[formItemProp]"
    font="leading-normal"
    p="y-2px"
    v-bind="attrs"
    v-on="listeners"
  />

  <el-radio-group
    v-else-if="formType === 'radio'"
    v-model="model[formItemProp]"
  >
    <el-radio v-for="item in formOption.input.options" :key="item[valueField]" :label="item[valueField]">
      {{ item[labelField] }}
    </el-radio>
  </el-radio-group>

  <el-checkbox-group
    v-else-if="formType === 'checkbox'"
    v-model="model[formItemProp]"
  >
    <el-checkbox
      v-for="item in formOption.input.options"
      :key="item[valueField]"
      :type="item.prop"
      :label="item[valueField]"
    >
      {{ item[labelField] }}
    </el-checkbox>
  </el-checkbox-group>

  <el-switch
    v-else-if="formType === 'switch'"
    v-model="model[formItemProp]"
    v-bind="attrs"
    v-on="listeners"
  />

  <div
    v-else-if="formType === 'div'"
    v-bind="attrs"
    v-on="listeners"
    v-text="model[formItemProp]"
  />
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import { omitBy, pickBy } from 'lodash-es'

export default {
  name: 'NFormValueItem',
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
    formIs() {
      return this.formOption.is
    },
    formType() {
      return this.formOption.type
    },
    colOption() {
      return this.formOption.col
    },
    formItemOption() {
      return this.formOption.formItem
    },
    formItemProp() {
      return this.formItemOption.prop
    },
    inputOption() {
      return this.formOption.input
    },
    formInitialize() {
      return this.formOption.initialize
    },
    attrs() {
      return omitBy(this.inputOption, (_, key) => {
        return key.startsWith('on')
      })
    },
    listeners() {
      const listeners = Object.create(null)
      const attrs = pickBy(this.inputOption, (_, key) => key.startsWith('on'))
      Object.keys(attrs).forEach((key) => {
        listeners[key.slice(2).toLocaleLowerCase()] = attrs[key]
      })
      return listeners
    },
  },
  watch: {
    formIs() {
      this.formInitialize?.(this.formOption, this.model)
    },
    formType() {
      this.formInitialize?.(this.formOption, this.model)
    },
  },
  created() {
    this.formInitialize?.(this.formOption, this.model)
  },
}
</script>
