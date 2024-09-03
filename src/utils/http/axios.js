import axios from 'axios'
import { MessageBox } from 'element-ui'
import xss from 'xss'
import JSEncrypt from 'jsencrypt'
import { isPlainObject } from 'lodash-es'
import { axiosCanceler } from './axiosCancel'
import httpConfig from './httpConfig'

// https://www.npmjs.com/package/jsencrypt
const encrypt = new JSEncrypt()
encrypt.setPublicKey('pub_key')

const decrypt = new JSEncrypt()
decrypt.setPrivateKey('priv_key')

class HttpRequest {
  constructor(options) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const { params, data, headers } = config
        const {
          authenticationScheme = 'Bearer',
          allowAbort = false,
        } = this.options
        const {
          withToken = true,
          isXssTest = true,
          isEncrypt = true,
        } = config

        allowAbort && axiosCanceler.addPending(config)

        const token = 'getToken()'
        if (token && withToken) {
          // jwt token
          headers.Authorization = authenticationScheme
            ? `${authenticationScheme} ${token}`
            : token
        }
        if (params) {
          if (isXssTest !== false && xss(JSON.stringify(params)))
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject(10000)

          if (isEncrypt !== false) {
            for (const [key, value] of Object.entries(params))
              params[key] = this.encrypt(value)
          }
        }

        if (data) {
          if (isXssTest !== false && xss(JSON.stringify(data)))
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject(10000)

          if (isEncrypt !== false) {
            for (const [key, value] of Object.entries(data))
              data[key] = this.encrypt(value)
          }
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    this.axiosInstance.interceptors.response.use(
      (response) => {
        response.data = this.decrypt(response.data)
        return response
      },
      (error) => {
        const status = error?.data.code
        httpConfig.find(({ code, type = 'error', title = '错误', tip }) => {
          if (code === status) {
            MessageBox.confirm(tip, title, {
              showCancelButton: false,
              type,
            })
          }
          return code === status
        })
        return Promise.reject(error)
      },
    )
  }

  request(options) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(options)
        .then((res) => {
          const { isReturnNativeResponse = false } = options
          resolve(isReturnNativeResponse ? res : res.data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  encryptPrimitiveValuesRecursive(val) {
    function isPrimitive(val) {
      return (typeof val !== 'object' && typeof val !== 'function') || val === null
    }
    if (isPlainObject(val)) {
      for (const key in val) {
        if (Object.hasOwnProperty.call(val, key)) {
          if (isPrimitive(val[key]))
            val[key] = encrypt.encrypt(val[key])
          else
            this.encryptPrimitiveValuesRecursive(val[key])
        }
      }
    }
    else if (Array.isArray(val)) {
      val.forEach((v, i) => {
        if (isPrimitive(v))
          val[i] = decrypt.encrypt(v)
        else
          this.encryptPrimitiveValuesRecursive(v)
      })
    }
  }

  encrypt(data) {
    return encrypt.encrypt(JSON.stringify(data))
  }

  decrypt(data) {
    return JSON.parse(decrypt.decrypt(data))
  }
}

export default HttpRequest
