import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loginInfo: JSON.parse(localStorage.getItem('loginInfo'))
  },
  getters: {

  },
  mutations: {

  },
})

export default store
