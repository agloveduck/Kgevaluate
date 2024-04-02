// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css' // 导入相关样式
import Vue from 'vue'
import ElementUI from 'element-ui'// 导入element-ui包
import axios from 'axios'
import router from './router'
import App from './App'

import Vue2Editor from 'vue2-editor'
// import { userinfo } from '@/utils/config.js'
// // 全局方法挂载
// Vue.prototype.userinfo = userinfo
Vue.use(ElementUI) // 引用
Vue.prototype.$http = axios // $http.get() /post()
Vue.config.productionTip = false

Vue.use(Vue2Editor)
/* eslint-disable no-new */
new Vue({ // vue 全局实例
  el: '#app', // 绑定vue全局实例作用范围
  router, // 注册路由对象
  components: { App }, // 注册组件
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin)) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('userinfo')) { // 判断当前用户的登录信息userinfo是否存在
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})
