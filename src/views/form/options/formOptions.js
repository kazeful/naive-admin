const formOptions = [
  {
    prop: 'input',
    label: '输入框',
    formType: 'input',
  },
  {
    prop: 'select',
    label: '下拉框',
    formType: 'select',
    dict: [
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
  {
    prop: 'customLabel',
    label: '自定义标签',
    formType: 'input',
  },
  {
    prop: 'customForm',
    label: '自定义表单',
    formType: 'input',
  },
  {
    prop: 'radio',
    label: '单选框',
    formType: 'radio',
    dict: [
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
  {
    prop: 'checkbox',
    label: '多选框',
    formType: 'checkbox',
    dict: [
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
  {
    prop: 'treeselect',
    formType: 'treeselect',
    label: 'treeselect',
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
  {
    prop: 'switch',
    formType: 'switch',
    label: '开关',
  },
  {
    span: 24,
    prop: 'textarea',
    label: '文本域',
    formType: 'textarea',
  },
]

const formValue = {
  input: '',
  select: '',
  customLabel: '',
  customForm: '',
  radio: '',
  checkbox: [],
  treeselect: [],
  switch: false,
  textarea: '',
}

export { formOptions, formValue }
