import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入ElementUI
import ElementUI from 'element-ui'

// 引入自定义的全局样式文件
import './styles/index.scss'

// 将Element注册为Vue插件,Vue使用别人的组件时,会用到Vue.use ()
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
