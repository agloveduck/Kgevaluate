# ao_vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
# install axios
 npm install axios --save-dev
# 在main.js中引入axios
import axios from 'axios'
# 接着将axios改写为Vue的原型属性
Vue.prototype.$http=axios
# 全局配置baseURL(后面如果接口baseURL更改了，可直接修改这里就可以了)
Vue.prototype.$http.defaults.baseURL = '' 
# Vue自动生成文字头像插件
 npm install vue-avatar
 # suibianxx
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
