import Vue from 'vue'
import Router from 'vue-router'

import index from "@/views/system";
import userIndex from "@/views/system/userManage/index";
import addUser from "@/views/system/userManage/addUser";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'index',
    },
    {
      path: '/index',
      name: 'index',
      component:index,
      children: [
        {
          path:"",
          name:"userIndex",
          component: userIndex,
        },
        {
          path: '/userIndex',
          title: '用户管理',
          name: 'userIndex',
          component:userIndex,
        },
        {
          path: '/addUser',
          title: '添加用户',
          name: 'addUser',
          component:addUser,
        },

      ]
    }
  ]
})
