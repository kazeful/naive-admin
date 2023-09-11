const formOptions = [
  {
    prop: 'input',
    label: '输入框',
    type: 'input',
  },
  {
    prop: 'select',
    label: '下拉框',
    type: 'select',
    props: {
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
    prop: 'customLabel',
    label: '自定义标签',
    type: 'input',
  },
  {
    prop: 'customForm',
    label: '自定义表单',
    type: 'input',
  },
  {
    prop: 'radio',
    label: '单选框',
    type: 'radio',
    props: {
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
    prop: 'checkbox',
    label: '多选框',
    type: 'checkbox',
    props: {
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
    prop: 'treeselect',
    type: 'treeselect',
    label: 'treeselect',
    props: {
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
    prop: 'switch',
    type: 'switch',
    label: '开关',
    next(self, model) {
      return {
        show: model[self.prop],
        span: 24,
        prop: 'textarea',
        label: '文本域',
        type: 'textarea',
        next(self, model) {
          return {
            show: model[self.prop] === 'show', // Displays when you enter 'show'
            span: 24,
            prop: 'textarea2',
            label: '文本域',
            type: 'textarea',
          }
        },
      }
    },
  },
  // {
  //   span: 24,
  //   prop: 'textarea',
  //   label: '文本域',
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
