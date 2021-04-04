import Vue from 'vue'
import App from './App.vue'
import router from './router'

//导入全局样式表
import './assets/css/global.css'
//导入字体图标
import './assets/download/font_bekudzxvpgv/iconfont.css'

//手动配置element-ui
import ElementUI from 'element-ui' // 导入组件库
import 'element-ui/lib/theme-chalk/index.css'  //导入组件相关样式
import axios from 'axios'
import * as echarts from 'echarts';//视图
import qs from 'qs'
import Vuex from 'vuex'
//打印
import Print from 'vue-print-nb'
//导出excel表格
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

Vue.prototype.$echarts=echarts
Vue.prototype.$http = axios
Vue.prototype.$qs =qs
Vue.use(ElementUI)//配置Vue插件

Vue.use(Vuex)

axios.defaults.baseURL='http://localhost:8083/'
// axios.defaults.withCredentials = true;


Vue.use(Print);  //注册应用打印
Vue.config.productionTip = false

// const store = new Vuex.Store({
//   state: {
//   },
//   mutations: {
//
//   },
//   getters: {}
// })

new Vue({
  render: h => h(App),
  router
}).$mount('#app')