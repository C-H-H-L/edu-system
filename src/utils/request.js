import axios from 'axios'
// 引入Vuex的数据
import store from '@/store'
// 通过局部引入方式引入Element的Message消息提示组件功能
import { Message } from 'element-ui'
// 引入router
import router from '@/router'
// 引入qs用于请求参数urlencoded格式转换
import qs from 'qs'

// create创建一个axios实例
const request = axios.create({
  // timeout:
  // baseURL:
  // headers:
})

function getBaseURL (url) {
  if (url.startWith('')) {
    return 'http://xxx.xxx.com'
  } else {
    return 'http://xxx.xxx.com'
  }
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 判断config.url的前缀，用于判断访问的地址是前台地址还是后台地址，baseURL会作为发送url请求的前缀使用
  config.baseURL = getBaseURL(config.url)
  // 统一设置Token信息，用于接口鉴权处理
  const { user } = store.state
  if (user || user.access_token) {
    config.headers.Authorization = user.access_token
  }
  // 必须
  return config
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      // currentRoute就是存储了路由信息的对象
      redirect: router.currentRoute.fullPath
    }
  })
}

// 存储是否正在更新Token的状态
let isRefreshing = false
// 存储因为等待Token刷新而挂起的请求
let requests = []

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 状态码2xx会执行这里
  console.log('响应成功了：', response)
  return response
}, function (error) {
  if (error.response) {
    // 请求发送成功，响应接受完毕，但状态码为失败的情况
    // 判断失败的状态码情况（主要处理401的情况）
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
      // 1.无Token信息
      if (!store.state.user) {
        // 没有Token信息的情况下跳转到登录页
        redirectLogin()
        return Promise.reject(error)
      }

      // 检测是否已经存在了正在刷新Token的请求
      if (isRefreshing) {
        // 将当前失败的请求存储到请求列表中
        return requests.push(() => {
          // 当前函数调用后，会自动发送本次失败的请求
          request(error.config)
        })
      }
      isRefreshing = true

      // 2.Token无效（错误Token，过期Token）
      // - 发送请求，获取新的Token
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        // - 刷新Token失败
        if (res.data.state !== 1) {
          // 删除无效的用户信息
          store.commit('setUser', null)
          // 跳转到登录页
          redirectLogin()
          return Promise.reject(error)
        }
        // - 刷新Token成功
        // - 存储新的Token
        store.commit('setUser', res.data.content)
        // - 重新发送失败的请求（根据request发送所有失败的请求），error.config中包含的是这次失败请求的配置对象
        requests.forEach(callback => callback())
        // - 发送完毕，清除requests内容
        requests = []
        // - 将本次请求发送
        return requests(error.config)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        // 请求发送完毕，响应处理完毕，将刷新状态更改为false
        isRefreshing = false
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务端错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求发送成功，但是未收到响应
    Message.error('请求超时，请重试')
  } else {
    // 一聊之外的错误
    Message.error(error.message)
  }
  // 将本次请求的错误对象继续向上抛出，让接受响应的处理函数进行操作
  return Promise.reject(error)
})

export default request
