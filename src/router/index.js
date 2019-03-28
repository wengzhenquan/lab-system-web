import Vue from 'vue'
import Router from 'vue-router'

import login from "@/views/login";                     //登录页
import homePage from "@/views/homePage";
import home from "@/views/home";                        //首页
import index from "@/views/index";                     //主题内容
import userIndex from "@/views/userManage/index";      //用户管理-用户列表
import identityList from "@/views/userManage/identityList";  //身份列表

import teachIndex from "@/views/teachManage/index";                   //教务管理
import teachList from "@/views/teachManage/teachList";                //课程管理

import experimentTask from "@/views/teachManage/experimentTask";      //实验任务管理
import addTask from "@/views/teachManage/addTask";                    //添加任务
import taskInfo from "@/views/teachManage/taskInfo";                  //查看任务
import editTask from "@/views/teachManage/editTask"                   //编辑实验任务

import experimentReport from "@/views/teachManage/experimentReport";  //实验报告管理
import addReport from "@/views/teachManage/addReport";                //添加实验报告
import editReport from "@/views/teachManage/editReport";              //修改实验报告
import reportInfo from "@/views/teachManage/reportInfo";              //查看实验报告

import studentManage from "@/views/teachManage/studentManage";        //学生管理
import scoreManage from "@/views/teachManage/scoreManage";            //成绩管理

import labIndex from "@/views/labManage";                       // 实验室
import labManage from "@/views/labManage/labManage";            // 实验室管理
import labApply from "@/views/labManage/labApply";              // 实验室申请
import labApproval from "@/views/labManage/labApproval";        // 实验室审批

import deviceIndex from "@/views/deviceManage";                  // 设备
import devManage from "@/views/deviceManage/devManage";          // 设备管理
import devUseManage from "@/views/deviceManage/devUseManage";    // 设备使用与分配
import devStock from "@/views/deviceManage/devStock";            // 库存管理
import devApply from "@/views/deviceManage/devApply";            // 设备申请

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
      children: [
        {
          path: '/',
          name: 'home',
          component: home,
          title: '首页'
        },
        {
          path: '/index',
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
              title: '实验任务管理'
            },
            {
              path: '/addTask',
              name: 'addTask',
              component: addTask,
              title: '添加实验任务'
            },
            {
              path: '/taskInfo',
              name: 'taskInfo',
              component: taskInfo,
              title: '查看实验任务'
            },
            {
              path: '/editTask',
              name: 'editTask',
              component: editTask,
              title: '编辑实验任务'
            },
            {
              path: '/experimentReport',
              name: 'experimentReport',
              component: experimentReport,
              title: '实验报告管理'
            },
            {
              path: '/addReport',
              name: 'addReport',
              component: addReport,
              title: '添加实验报告'
            },
            {
              path: '/editReport',
              name: 'editReport',
              component: editReport,
              title: '实验报告信息'
            },
            {
              path: '/reportInfo',
              name: 'reportInfo',
              component: reportInfo,
              title: '查看实验报告'
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
        },
        {
          path: '/labIndex',
          name: 'labIndex',
          component: labIndex,
          children: [
            {
              path: '',
              name: 'labManage',
              component: labManage
            },
            {
              path: '/labManage',
              name: 'labManage',
              component: labManage,
              title: '实验室管理'
            },
            {
              path: '/labApply',
              name: 'labApply',
              component: labApply,
              title: '实验室申请'
            },
            {
              path: '/labApproval',
              name: 'labApproval',
              component: labApproval,
              title: '实验室审批'
            },
          ]
        },
        {
          path: '/deviceIndex',
          name: 'deviceIndex',
          component: deviceIndex,
          children: [
            {
              path: '',
              name: 'devManage',
              component: devManage
            },
            {
              path: '/devManage',
              name: 'devManage',
              component: devManage,
              title: '设备管理'
            },
            {
              path: '/devUseManage',
              name: 'devUseManage',
              component: devUseManage,
              title: '设备使用与分配'
            },
            {
              path: '/devStock',
              name: 'devStock',
              component: devStock,
              title: '库存管理'
            },
            {
              path: '/devApply',
              name: 'devApply',
              component: devApply,
              title: '设备申请'
            },
          ]
        },
      ]
    }
  ]
})
