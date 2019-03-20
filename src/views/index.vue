<template>
    <div style="display: flex">
      <div>
        <Menu active-name="1-2" :open-names="['2']">
          <MenuItem name="1" style="color:#fff;background: #2d8cf0;">账户管理</MenuItem>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-filing" />
              账户管理
            </template>
            <MenuItem name="2-1">用户列表</MenuItem>
            <MenuItem name="2-2">添加用户</MenuItem>
            <MenuItem name="2-3">删除用户</MenuItem>
            <Submenu name="3">
              <MenuItem name="3-1">Option 7</MenuItem>
              <MenuItem name="3-2">Option 8</MenuItem>
            </Submenu>
          </Submenu>
        </Menu>
      </div>
      <div style="margin-left: 10px">
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
    width: 168px !important;
  }
</style>
