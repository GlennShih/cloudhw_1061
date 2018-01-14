// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/application.js'
import VueStash from 'vue-stash';

Vue.use(VueStash)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data:{
    store:{
      authorized: false
    }
  },
  template: '<App/>',
  components: { App }
})
