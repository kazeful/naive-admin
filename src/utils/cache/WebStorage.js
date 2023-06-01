// Migrate from https://github.com/kazeful/naive-storage.git

export class WebStorage {
  constructor(storage, prefixKey) {
    this.storage = storage
    this.prefixKey = prefixKey
  }

  _getInputData(value, options) {
    const _value = {
      value,
      timestamp: new Date().getTime(),
      options,
    }

    return JSON.stringify(_value)
  }

  _getOutputData(value) {
    const _value = JSON.parse(value)

    return _value
  }

  _getData(_key) {
    const _value = this.storage.getItem(_key)

    return _value === null ? _value : this._getOutputData(_value)
  }

  _getKey(key) {
    return `${this.prefixKey}${key}`
  }

  _remove(_key) {
    this.storage.removeItem(_key)
  }

  _isExpired(_key, _value) {
    const { timestamp, options } = _value
    const { expires } = options

    return expires ? timestamp + expires * 24 * 3600 * 1000 - new Date().getTime() < 0 : false
  }

  _isOnce(_key, _value) {
    const { options } = _value
    const { isOnce } = options

    return !!isOnce
  }

  /**
   * Get the value corresponding to the key in the storage
   * @param key - key
   * @param def - A default value that is returned if the key does not exist in storage
   */
  get(key, def) {
    const _key = this._getKey(key)
    const _value = this._getData(_key)

    if (!_value)
      return def

    const isExpired = this._isExpired(_key, _value)
    const isOnce = this._isOnce(_key, _value)

    if (isExpired || isOnce)
      this._remove(_key)

    return isExpired ? def : _value.value
  }

  /**
   * Set the value corresponding to the key in the storage
   * @param key - key
   * @param value - value
   * @param options - Configuration item. For details, see Type
   */
  set(key, value, options = {}) {
    const _key = this._getKey(key)
    const _value = this._getInputData(value, options)

    this.storage.setItem(_key, _value)
  }

  /**
   * Set a key-value pairs that is removed after being read once
   * @param key - key
   * @param value - value
   * @param options - Configuration item. For details, see Type
   */
  once(key, value, options = {}) {
    this.set(key, value, Object.assign(options, {
      isOnce: true,
    }))
  }

  /**
   * Remove a key from storage
   */
  remove(key) {
    const _key = this._getKey(key)

    this._remove(_key)
  }

  /**
   * Traverse all key-value pairs within the current instance
   */
  each(callbackfn) {
    for (let i = this.storage.length - 1; i >= 0; i--) {
      const _key = this.storage.key(i)

      if (_key.startsWith(this.prefixKey)) {
        const key = _key.split(this.prefixKey, 2)[1]

        callbackfn(key, this.get(key))
      }
    }
  }

  /**
   * Traverse Remove all key-value pairs within the current instance
   */
  clearAll() {
    this.each((key) => {
      this.remove(key)
    })
  }
}
