import Vue from 'vue'
import App from './App.vue'
import './style.css'

Vue.config.productionTip = true

new Vue({
  render: h => h(App),
}).$mount('#app')
