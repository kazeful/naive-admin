import {
  isArray,
  isFunction,
  isMap,
  isNil,
  isNumber,
  isObject,
  isPlainObject,
  isSet,
  isString,
  isUndefined as isUnDef,
} from 'lodash-es'

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export const isBrowser = !isServer

export function isDef(val) {
  return !isUnDef(val)
}

export const toString = Object.prototype.toString

export function is(val, type) {
  return toString.call(val) === `[object ${type}]`
}

function isPrimitive(val) {
  return (typeof val !== 'object' && typeof val !== 'function') || val === null
}

export function isReference(val) {
  return !isPrimitive(val)
}

export function isWindow(val) {
  return typeof isDef(window) && is(val, 'Window')
}

export function isPromiseLike(val) {
  return isObject(val) && isFunction(val.then)
}

export function isJson(val) {
  // Es10 catch 可以不写error
  try {
    JSON.parse(val)
    return true
  }
  catch {
    return false
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isVisibleInViewport(el, isFullyVisible) {
  const { top, left, right, bottom } = el.getBoundingClientRect()
  const { innerHeight, innerWidth } = window
  return isFullyVisible
    ? (
        (
          (top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)
        )
        && (
          (left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)
        )
      )
    : (top > 0 && left > 0 && bottom < innerHeight && right < innerWidth)
}
