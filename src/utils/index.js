// 放一些不确定分类的实用函数
import { isArray, isPlainObject, isString, omitBy } from 'lodash-es'
import { isEmpty } from '@/utils/is'

export function filterEmpty(val, fn = isEmpty) {
  if (isArray(val))
    return val.filter(fn)
  if (isPlainObject(val))
    return omitBy(val, fn)
}

export function reverse(source) {
  if (isString(source))
    return source.split('').reverse().join('')

  if (isArray(source)) {
    const arr = []
    for (let i = source.length - 1; i >= 0; i--) {
      const element = source[i]
      arr.push(element)
    }
    return arr
  }
}

export async function errorCapture(asyncFunc) {
  try {
    const res = await asyncFunc()
    return [null, res]
  }
  catch (err) {
    return [err, null]
  }
}
