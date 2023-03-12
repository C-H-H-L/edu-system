import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用于在登录成功后保存用户信息（初始值尝试读取本地存储）
    user: JSON.parse(window.localStorage.getItem('user') || null)
  },
  getters: {
  },
  mutations: {
    // 存储用户数据
    setUser (state, payload) {
      // 如果payload是一个json字符串，可以先转换成JavaScript对象
      state.user = JSON.parse(payload)
      // 将payload数据添加到本地存储中
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
