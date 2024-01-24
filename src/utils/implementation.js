/* eslint-disable no-invalid-this */
import { isArray, isDate, isFunction, isNull, isPlainObject, isUndefined } from 'lodash-es'
import { isJson } from './is'

/**
 * 防抖函数
 * 例如 百度输入框一直输入时不会出现返回的列表数据
 */
export function debounce(fn, delay) {
  let timer
  return function (...arg) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, ...arg)
    }, delay)
  }
}

/**
 * 节流函数
 * 例如 避免在scroll、resize时过于频繁的更新
 */
export function throttle(fn, interval) {
  const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))
  let canRun = true
  return async function (...arg) {
    if (!canRun)
      return
    canRun = false
    fn.apply(this, ...arg)
    await sleep(interval)
    canRun = true
  }
}

export function cloneFunc(func) {
  // eslint-disable-next-line no-new-func
  return new Function(`return ${func.toString()}`)()
}

/**
 * 深拷贝 支持json Date 数组 函数 普通对象
 * 注意json对象属性名称必须是双引号括起来的字符串且最后一个属性后不能有逗号
 */
export function cloneDeep(val) {
  if (isUndefined(val))
    return
  if (isNull(val))
    return null
  if (isJson(val))
    return JSON.parse(JSON.stringify(val))
  if (isDate(val))
    return new Date(val)
  if (isArray(val))
    return val.slice()
  if (isFunction(val))
    return cloneFunc(val)
  if (!isPlainObject(val))
    return new Error('The passed type is not supported')
  const newVal = new val.constructor() // 保持继承链
  for (const key in val) {
    // 不遍历其原型链上的属性
    if (Object.prototype.hasOwnProperty.call(val, key)) {
      const element = val[key]
      newVal[key] = isPlainObject(element) ? cloneDeep(val) : element
    }
  }
  return newVal
}

export function softBind(fn, obj, ...rest) {
  const bound = function (...arg) {
    return fn.apply(
      (!this || this === (window || globalThis)) ? obj : this,
      Array.prototype.concat.apply(rest, arg),
    )
  }
  bound.prototype = Object.create(fn.prototype)
  return bound
}

/**
 * @description: 纵向合并单元格
 * @param {Array} data 表格数据
 * @param {Array | string} contentList 需要纵向合并列 依据的字段组成的数组 也可传单个字段字符串
 * @return {Array} 每行合并的格数组成的数组
 * @author: Wind
 * eg:
 * const row = rowSpanList[rowIndex]
 * const col = _row > 0 ? 1 : 0
 * return [row, col]
 */
export function getRowSpanList(data, contentList) {
  // 单个字段转为数组
  !Array.isArray(contentList) && (contentList = [contentList])
  // 每次都清空之前存储的 保证遍历的数据是最新的数据。以免造成数据渲染混乱
  const rowSpanList = []
  let pos = 0
  // 遍历数据
  data.forEach((_, index) => {
    // 判断是否是第一项
    if (index === 0) {
      rowSpanList.push(1)
      pos = 0
    }
    else {
      // 不是第一项时，就根据标识去存储
      if (contentList.every(content => data[index][content] === data[index - 1][content])) {
        // 查找到符合条件的数据时每次要把之前存储的数据+1
        rowSpanList[pos] += 1
        rowSpanList.push(0)
      }
      else {
        // 没有符合的数据时，要记住当前的index
        rowSpanList.push(1)
        pos = index
      }
    }
  })
  return rowSpanList
}

// camelCase or CamelCase => camel-case
export function toLine(value) {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// camel-case => camelCase
export function toHump(value) {
  return value.replace(/-(\w)/g, (all, letter) => {
    // all => -Case letter => Case
    return letter.toUpperCase()
  })
}

// firstUpper => FirstUpper
export function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
