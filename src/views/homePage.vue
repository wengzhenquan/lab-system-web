<template>
  <div class="layout">
    <Layout>
      <Header>
        <div style="width: 90%;margin: 0 auto;display: flex;justify-content: space-between;color: #fff">
          <div>2019-3-20 星期一</div>
          <div>用户名 | 退出</div>
        </div>
      </Header>
      <Content>
        <div class="top">
          <div>实验室系统</div>
          <div></div>
        </div>
        <div style="background-color: #2d8cf0;">
          <div class="nav">
            <Router-link to="/homePage">
              <MenuItem name="1">首页</MenuItem>
            </Router-link>
            <Router-link to="/homePage">
              <MenuItem name="2">账户管理</MenuItem>
            </Router-link>
            <Router-link to="/homePage">
              <MenuItem name="3">教务管理</MenuItem>
            </Router-link>
            <Router-link to="/homePage">
              <MenuItem name="4">实验室管理</MenuItem>
            </Router-link>
            <Router-link to="/homePage">
              <MenuItem name="5">设备管理</MenuItem>
            </Router-link>
            <Router-link to="/homePage">
              <MenuItem name="6">设备采购</MenuItem>
            </Router-link>
          </div>
        </div>
        <Card>
          <div style="width: 80%;margin: 0 auto;">
            <router-view/>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
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
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
  .ivu-layout-header {
    padding: 0;
  }
  .ivu-menu-horizontal,
  .ivu-layout-header {
    height: 30px;
    line-height: 30px;
  }
  .ivu-menu-dark {
    background: #2e3f65;
  }
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

<style lang="less" scoped>
.top {
  background: #fff;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 150px;
  background: url("./img/login_bg.jpg") no-repeat;
  background-size: 100% 100%;
}
  .nav {
    display: flex;
    width: 80%;
    margin: 0 auto;
    font-size: 14px;
    color: #fff;
  }
a,
a:hover {
  color: #fff;
}
</style>
