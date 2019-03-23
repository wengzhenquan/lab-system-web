<template>
    <div style="display: flex">
      <div style="height: 700px;background-color: #fff;border-radius: 5px;border: 1px solid #b7b7b7">
        <!--账户管理-->
        <Menu active-name="1-2" :open-names="['2']">
          <MenuItem name="1" style="color:#fff;background: #2d8cf0;">账户管理</MenuItem>
          <Router-link to="/userIndex">
            <MenuItem name="2"><Icon type="ios-filing" />账户管理</MenuItem>
          </Router-link>
          <Router-link to="/identityList">
            <MenuItem name="3"><Icon type="ios-filing" />身份与权限</MenuItem>
          </Router-link>
        </Menu>
      </div>
      <div style="margin-left: 10px;height: 700px;background-color: #fff;border-radius: 5px;padding: 12px;width: 86%;border: 1px solid #b7b7b7">
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
