import Vue from 'vue'
import Router from 'vue-router'

import login from "@/views/login";            //登录页
import homePage from "@/views/homePage";     //首页
import index from "@/views/index";           //主题内容
import userIndex from "@/views/userManage/index";   //用户管理-用户列表

// import index from "@/views/system";       //后台首页
// import userIndex from "@/views/system/userManage/index";   //用户管理-用户列表
// import identityManage from "@/views/system/userManage/identityManage";   //身份与权限
// import addUser from "@/views/system/userManage/addUser";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      title: '登录页',
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage,
      title: '首页',
      children: [
        {
          path: '',
          name: 'index',
          component: index,
          children: [
            {
              path: '',
              name: 'userIndex',
              component: userIndex,
            },
            {
              path: '/userIndex',
              name: 'userIndex',
              component: userIndex,
              title: '用户管理',
            }
          ]
        },
      ]
    }
    // {
    //   path: '/index',
    //   name: 'index',
    //   component:index,
    //   children: [
    //     {
    //       path:"/index",
    //       name:"userIndex",
    //       component: userIndex,
    //       title: '账户管理',
    //     },
    //     {
    //       path:"/index/userIndex",
    //       name:"userIndex",
    //       component: userIndex,
    //       title: '账户管理',
    //     },
    //     {
    //       path: '/index/identityManage',
    //       title: '身份与权限',
    //       name: 'identityManage',
    //       component: identityManage,
    //     },
    //
    //   ]
    // }
  ]
})
