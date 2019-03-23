import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import CreatePatient from './components/CreatePatient'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false
Vue.component('create-patient', CreatePatient)
Vue.use(VeeValidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
