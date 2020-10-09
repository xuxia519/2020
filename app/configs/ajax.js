
import axios from 'axios'
import { hashHistory } from 'react-router'
import { timeout, baseURL } from '@config'
import { message } from 'antd'
import { parseQueryString } from './common'

const { CancelToken } = axios

// 防止连续出现多个用户登录超时的提示
let flag = true
function logOut(text) {
  if (flag) {
    // message.warning(text || '用户登录过期或从其他浏览器登录')
    sessionStorage.clear();
    hashHistory.replace('/login')
    flag = false
    setTimeout(() => flag = true, 0)
  }
}

let baseConfig = {
  url: '/',
  method: 'get', // default
  baseURL: '',
  
  headers: {
    'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
  },
  params: {
    // ID: 12345,
  },
  data: {
    // firstName: 'Fred',
  },
  timeout: '',
  withCredentials: true, // default
  // responseType: 'json', // default 这一句
  maxContentLength: 2000,
  validateStatus(status) {
    return status >= 200 && status < 300 // default
  },
}

baseConfig = { ...baseConfig, timeout: timeout, baseURL: baseURL }

export const oftenFetchByPost = (api, options) => {
  // 当api参数为createApi创建的返回值
  if (typeof api === 'function') return api
  return (...rest) => {
    // 参数分析
    // const method = rest[1] || 'get'
    const method = rest[0].method || 'post'
    const data = rest[0].values || {}
    
    const token = sessionStorage.getItem('token')
    if (token) {
      baseConfig.headers['Authorization'] = `Bearer ${token}`
    } else {
      delete baseConfig.headers.Authorization
    }
    let success = null
    let failure = null
    let config = null
    for (let i = 1; i < rest.length; i += 1) {
      if (typeof rest[i] === 'function') {
        if (!success) {
          success = rest[i]
        } else {
          failure = rest[i]
        }
      }
      if (Object.prototype.toString.call(rest[i]) === '[object Object]') {
        config = rest[i]
      }
    }

    const hooks = {
      abort: null,
    }

    const cancelToken = new CancelToken((c) => { hooks.abort = c })
    // 如果是用的30上的mock的服务，那么就默认不带cookie到服务器
    if (options && (options.baseURL.indexOf('12602') !== -1)) {
      baseConfig.withCredentials = false
    } else {
      baseConfig.withCredentials = true
    }

    // axios.interceptors.request.use(function (config) {
    //   config.headers.token = window.localStorage.getItem('token');
    //   return config;
    // }, function (error) {
    //   return Promise.reject(error);
    // });

    // if (window.localStorage.getItem('token')) {
    //   axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token')
    // }
    axios({
      ...baseConfig, ...options, ...config, method, url: api, data, cancelToken,
    })
      .then(response => response.data)
      .then((response) => {
        // success && success(response);
        switch (response.status) {
          case 1: { success && success(response); break }
          case 0: {
            // message.warning(response.msg)
            // failure && failure(response)
            if (typeof failure === 'function') {
              failure(response)
            } else {
              // eslint-disable-next-line
              if (response.msg === '系统内部错误!') {
                message.error(response.msg)
              } else {
                message.warning(response.msg)
              }
            }
            break
          }
          case -1: {
            if (typeof failure === 'function') {
              failure(response)
            }
            logOut(response.msg)
            break
          }
          default: {
            if (typeof failure === 'function') {
              failure(response)
            } else {
              logOut()
            }
          }
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('Request canceled', e.message)
          }
        } else {
          console.dir(e)
          if (typeof failure === 'function') {
            if (e.code === 'ECONNABORTED') { // 超时的报错
              failure({
                data: '',
                msg: '服务器连接超时',
                status: 0,
              })
            } else {
              failure({
                data: '',
                msg: e.message,
                status: 0,
              })
            }
          }
        }
      })
    return hooks
  }
}

// 创建发起api的启动器
export const createApi = function (api, options) {
  const obj = parseQueryString(window.location.href)
  let url = api
  if (obj.key) {
    url = `${api}?key=${obj.key}`
    if (obj.sourceName) {
      url = `${api}?key=${obj.key}&sourceName=${obj.sourceName}`
    }
  }
  return oftenFetchByPost(`${url}`, options)
}

