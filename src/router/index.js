import Vue from 'vue'
import Router from 'vue-router'

import login from "@/views/login";                     //登录页
import homePage from "@/views/homePage";               //首页
import index from "@/views/index";                     //主题内容
import userIndex from "@/views/userManage/index";      //用户管理-用户列表
import identityList from "@/views/userManage/identityList";  //身份列表

import teachIndex from "@/views/teachManage/index";                   //教务管理
import teachList from "@/views/teachManage/teachList";                //课程管理
import experimentTask from "@/views/teachManage/experimentTask";      //实验课题管理
import experimentReport from "@/views/teachManage/experimentReport";  //实验报告管理
import studentManage from "@/views/teachManage/studentManage";        //学生管理
import scoreManage from "@/views/teachManage/scoreManage";            //成绩管理

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
            },
            {
              path: '/identityList',
              name: 'identityList',
              component: identityList,
              title: '身份列表',
            },
          ]
        },
        {
          path: '/teachIndex',
          name: 'teachIndex',
          component: teachIndex,
          children: [
            {
              path: '',
              name: 'teachList',
              component: teachList,
            },
            {
              path: '/teachList',
              name: 'teachList',
              component: teachList,
              title: '课程管理'
            },
            {
              path: '/experimentTask',
              name: 'experimentTask',
              component: experimentTask,
              title: '实验课题管理'
            },
            {
              path: '/experimentReport',
              name: 'experimentReport',
              component: experimentReport,
              title: '实验报告管理'
            },
            {
              path: '/studentManage',
              name: 'studentManage',
              component: studentManage,
              title: '学生管理'
            },
            {
              path: '/scoreManage',
              name: 'scoreManage',
              component: scoreManage,
              title: '成绩管理'
            },
          ]
        }
      ]
    }
  ]
})
