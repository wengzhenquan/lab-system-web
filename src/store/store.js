import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loginInfo: ''
  },
  getters: {
    getStorage:function (state) {
      if(!state.loginInfo) {
        state.loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
      }
      return state.loginInfo
    }
  },
  mutations: {
    getLoginInfo(state,data){
      state.loginInfo = data;
      localStorage.setItem('loginInfo', JSON.stringify(data));
    }
  },
})

export default store
