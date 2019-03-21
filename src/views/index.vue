<template>
    <div style="display: flex">
      <div style="height: 700px;background-color: #fff;border-radius: 5px">
        <!--账户管理-->
        <Menu active-name="1-2" :open-names="['2']">
          <MenuItem name="1" style="color:#fff;background: #2d8cf0;">账户管理</MenuItem>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-filing" />
              账户管理
            </template>
            <Router-link to="/userIndex"><MenuItem name="2-1">用户列表</MenuItem></Router-link>
            <Router-link to="/addUser"><MenuItem name="2-2">添加用户</MenuItem></Router-link>
            <Router-link to="/userIndex"><MenuItem name="2-3">删除用户</MenuItem></Router-link>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-filing" />
              身份与权限
            </template>
            <MenuItem name="3-1">权限分配</MenuItem>
          </Submenu>
        </Menu>
        <!--教务管理-->
        <!--<Menu active-name="1-2" :open-names="['2']">-->
          <!--<MenuItem name="1" style="color:#fff;background: #2d8cf0;">教务管理</MenuItem>-->
          <!--<Submenu name="2">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-filing" />-->
              <!--课程管理-->
            <!--</template>-->
            <!--<Router-link to="/userIndex"><MenuItem name="2-1">课程列表</MenuItem></Router-link>-->
            <!--<Router-link to="/addUser"><MenuItem name="2-2">添加课程</MenuItem></Router-link>-->
            <!--<Router-link to="/userIndex"><MenuItem name="2-3">修改课程</MenuItem></Router-link>-->
            <!--<Router-link to="/userIndex"><MenuItem name="2-4">删除课程</MenuItem></Router-link>-->
          <!--</Submenu>-->
          <!--<Submenu name="3">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-filing" />-->
              <!--实验课题-->
            <!--</template>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-1">我的实验课题</MenuItem></Router-link>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-2">添加实验课题</MenuItem></Router-link>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-3">修改实验课题</MenuItem></Router-link>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-4">删除实验课题</MenuItem></Router-link>-->
          <!--</Submenu>-->
          <!--<Submenu name="4">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-filing" />-->
              <!--实验报告-->
            <!--</template>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-1">我的实验报告</MenuItem></Router-link>-->
          <!--</Submenu>-->
        <!--</Menu>-->
        <!--实验室管理-->
        <!--<Menu active-name="1-2" :open-names="['2']">-->
          <!--<MenuItem name="1" style="color:#fff;background: #2d8cf0;">实验室管理</MenuItem>-->
          <!--<Submenu name="2">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-filing" />-->
              <!--实验室管理-->
            <!--</template>-->
            <!--<Router-link to="/userIndex"><MenuItem name="2-1">实验室管理</MenuItem></Router-link>-->
            <!--<Router-link to="/addUser"><MenuItem name="2-2">实验室审批</MenuItem></Router-link>-->
          <!--</Submenu>-->
          <!--<Submenu name="3">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-filing" />-->
              <!--实验课题-->
            <!--</template>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-1">我的实验课题</MenuItem></Router-link>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-2">添加实验课题</MenuItem></Router-link>-->
          <!--</Submenu>-->
        <!--</Menu>-->
        <!--设备管理-->
        <!--<Menu active-name="1-2" :open-names="['2']">-->
          <!--<MenuItem name="1" style="color:#fff;background: #2d8cf0;">设备管理</MenuItem>-->
          <!--<Submenu name="2">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-filing" />-->
              <!--设备管理-->
            <!--</template>-->
            <!--<Router-link to="/userIndex"><MenuItem name="2-1">全部设备</MenuItem></Router-link>-->
          <!--</Submenu>-->
          <!--<Submenu name="3">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-filing" />-->
              <!--已使用设备-->
            <!--</template>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-1">我的实验课题</MenuItem></Router-link>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-2">添加实验课题</MenuItem></Router-link>-->
          <!--</Submenu>-->
          <!--<Submenu name="4">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-filing" />-->
              <!--设备库存管理-->
            <!--</template>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-1">我的实验课题</MenuItem></Router-link>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-2">添加实验课题</MenuItem></Router-link>-->
          <!--</Submenu>-->
          <!--<Submenu name="5">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-filing" />-->
              <!--设备申请-->
            <!--</template>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-1">我的实验课题</MenuItem></Router-link>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-2">添加实验课题</MenuItem></Router-link>-->
          <!--</Submenu>-->
        <!--</Menu>-->
        <!--设备采购-->
        <!--<Menu active-name="1-2" :open-names="['2']">-->
          <!--<MenuItem name="1" style="color:#fff;background: #2d8cf0;">设备采购</MenuItem>-->
          <!--<Submenu name="2">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-filing" />-->
              <!--采购申请-->
            <!--</template>-->
            <!--<Router-link to="/userIndex"><MenuItem name="2-1">全部设备</MenuItem></Router-link>-->
          <!--</Submenu>-->
          <!--<Submenu name="3">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-filing" />-->
              <!--采购审批-->
            <!--</template>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-1">我的实验课题</MenuItem></Router-link>-->
            <!--<Router-link to="/userIndex"><MenuItem name="3-2">添加实验课题</MenuItem></Router-link>-->
          <!--</Submenu>-->
        <!--</Menu>-->
      </div>
      <div style="margin-left: 10px;height: 700px;background-color: #fff;border-radius: 5px;padding: 12px;width: 86%">
        <router-view/>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },

        methods: {}
    }
</script>

<style scoped>
  .ivu-menu-item {
    padding: 9px 30px;
  }
  .ivu-card-bordered {
    background: #dcdee247;
  }
  .ivu-menu {
    border-radius: 5px;
    width: 185px !important;
  }
  a {
    color: #515a6e;
  }
  .ivu-menu-submenu-title {
    background-color: #2b85e42e;
  }
</style>
