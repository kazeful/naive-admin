const Mock = require('mockjs')

const data = Mock.mock({
  'items|300': [
    {
      'id': '@id',
      'title': '@sentence(10, 20)',
      'status|1': ['published', 'draft', 'deleted'],
      'author': 'name',
      'date': '@datetime',
      'pageviews': '@integer(300, 5000)',
    },
  ],
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: () => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items,
        },
      }
    },
  },
]
