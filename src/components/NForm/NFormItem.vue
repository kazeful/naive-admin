<template>
  <div>
    <el-col
      v-if="formOption.show !== false"
      v-bind="pickByColProps(formOption)"
      :span="formOption.span || 24 / columnlayout"
    >
      <el-form-item v-bind="pickByFormItemProps(formOption)">
        <template #label>
          <slot v-if="$scopedSlots[`${formOption.prop}_label`]" :name="`${formOption.prop}_label`" :data="formOption" />
        </template>
        <template #default>
          <slot :name="formOption.prop" :data="formOption">
            <NFormValueItem :model="model" :form-option="formOption" />
          </slot>
        </template>
      </el-form-item>
    </el-col>
    <NFormItem
      v-if="formOption.next"
      :form-option="formOption.next(formOption, model)" :model="model" :columnlayout="columnlayout"
    >
      <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </NFormItem>
  </div>
</template>

<script>
import { pick } from 'lodash-es'
import { colProps, formItemProps } from './options'
import NFormValueItem from './NFormValueItem.vue'

export default {
  name: 'NFormItem',
  components: {
    NFormValueItem,
  },
  props: {
    formOption: Object,
    model: Object,
    columnlayout: Number,
  },
  methods: {
    pickByColProps(formOption) {
      return pick(formOption, colProps)
    },
    pickByFormItemProps(formOption) {
      return pick(formOption, formItemProps)
    },
  },
}
</script>
