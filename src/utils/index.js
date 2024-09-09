// 放一些不确定分类的实用函数
import { isArray, isEmpty, isPlainObject, isString, omitBy } from 'lodash-es'

export function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export function flatten(arr) {
  const result = []
  arr.forEach((item) => {
    result.push(item)
    if (item.children?.length)
      result.push(...flatten(item.children))
  })
  return result
}

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

export function asyncParallelLimit(tasks, limit) {
  return new Promise((resolve) => {
    let completedTasks = 0
    const results = Array.from({ length: tasks.length })
    const arr = tasks.slice()
    const queue = tasks.slice()

    function next(result, index) {
      completedTasks++
      results[index] = result

      if (completedTasks === tasks.length)
        resolve(results)
      else
        runTask()
    }

    function runTask() {
      if (queue.length) {
        const task = queue.shift()
        const index = arr.findIndex(item => item === task)
        task().then(res => next(res, index), err => next(err, index))
      }
    }

    for (let i = 0; i < limit && i < tasks.length; i++)
      runTask()
  })
}
