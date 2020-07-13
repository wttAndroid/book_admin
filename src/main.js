import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/element-variables.scss'
import './assets/css/index.scss'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
