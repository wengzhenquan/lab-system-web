import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Axios from './api/axios';
import "@/style/common.less";

require('./mock.js');
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;
Vue.use(iView);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
