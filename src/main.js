import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// import Axios from './api/axios';
import Axios from 'axios';
import { http } from './api/HttpUtils';
import promise from 'es6-promise';
import store from './store/store';
import "@/style/common.less";
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

require('./mock.js');
require('vue-quill-editor');
Vue.prototype.$axios = Axios;
Vue.prototype.$http = http;
Vue.config.productionTip = false;
Vue.use(VueQuillEditor);
promise.polyfill();
Vue.use(iView);

Vue.prototype.BaseConfig = 'http://localhost:8081';

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
