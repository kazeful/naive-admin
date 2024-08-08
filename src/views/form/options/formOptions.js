import { Switch } from 'element-ui'
import { markRaw } from 'vue'

const formOptions = [
  {
    formItem: {
      prop: 'input',
      label: '输入框',
    },
    // type: 'input',
    is: 'el-input',
  },
  {
    formItem: {
      prop: 'select',
      label: '下拉框',
    },
    type: 'select',
    input: {
      options: [
        {
          label: '区域一',
          value: '01',
        },
        {
          label: '区域二',
          value: '02',
        },
      ],
      clearable: true,
    },
  },
  {
    formItem: {
      prop: 'customLabel',
      label: '自定义标签',
    },
    type: 'input',
  },
  {
    formItem: {
      prop: 'customForm',
      label: '自定义表单',
    },
    type: 'input',
  },
  {
    formItem: {
      prop: 'radio',
      label: '单选框',
    },
    type: 'radio',
    input: {
      options: [
        {
          label: '区域一',
          value: '01',
        },
        {
          label: '区域二',
          value: '02',
        },
      ],
    },
  },
  {
    formItem: {
      prop: 'checkbox',
      label: '多选框',
    },
    type: 'checkbox',
    input: {
      options: [
        {
          label: '区域一',
          value: '01',
        },
        {
          label: '区域二',
          value: '02',
        },
      ],
    },
  },
  {
    formItem: {
      prop: 'treeselect',
      label: 'treeselect',
    },
    type: 'treeselect',
    input: {
      multiple: true,
      options: [
        {
          id: 'a',
          label: 'a',
          children: [
            {
              id: 'aa',
              label: 'aa',
            },
            {
              id: 'ab',
              label: 'ab',
            },
          ],
        },
        {
          id: 'b',
          label: 'b',
        },
        {
          id: 'c',
          label: 'c',
        },
      ],
    },
  },
  {
    formItem: {
      prop: 'switch',
      label: '开关',
    },
    // type: 'switch',
    is: markRaw(Switch),
    next(parent, model) {
      return {
        show: model[parent.formItem.prop],
        col: {
          span: 24,
        },
        formItem: {
          prop: 'textarea',
          label: '文本域',
        },
        type: 'textarea',
        next(parent, model) {
          return {
            show: model[parent.formItem.prop] === 'show', // Displays when you enter 'show'
            col: {
              span: 24,
            },
            formItem: {
              prop: 'textarea2',
              label: '文本域',
            },
            type: 'textarea',
          }
        },
      }
    },
  },
  // {
  //   col: {
  //     span: 24,
  //   },
  //   formItem: {
  //     prop: 'textarea',
  //     label: '文本域',
  //   },
  //   type: 'textarea',
  // },
]

const model = {
  // input: '',
  // select: '',
  // customLabel: '',
  // customForm: '',
  // radio: '',
  // checkbox: [],
  // treeselect: [],
  switch: true,
  // textarea: '',
}

export { formOptions, model }
