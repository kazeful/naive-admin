export default {
  processedOption(option) {
    let { url, params, data, headers = {}, ...rest } = option ?? {}
    const searchparams = new URLSearchParams(params)
    if (params)
      url = `${url}?${searchparams.toString()}`
    if (data)
      headers['Content-Type'] = 'application/json'
    return {
      url,
      // params,
      data,
      headers,
      rest,
    }
  },
  get(url, option) {
    const { url: realurl, headers, rest } = this.processedOption({ ...option, url })

    return fetch(realurl, {
      ...rest,
      headers,
    })
  },
  post(url, option) {
    const { url: realurl, headers, data, rest } = this.processedOption({ ...option, url })

    return fetch(realurl, {
      ...rest,
      headers,
      body: JSON.stringify(data),
    })
  },
  request(option) {
    const { url, method = 'get' } = option

    return this[method](url, option)
  },
}
