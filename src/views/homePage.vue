<template>
  <div class="layout">
    <Layout>
      <Header>
        <div style="width: 90%;margin: 0 auto;display: flex;justify-content: space-between;color: #fff">
          <div>{{nowTime}}</div>
          <div>
            <span>
              <Dropdown>
                <a href="javascript:void(0)" class="user-top">
                  {{userInfo.name}}
                  <Icon type="ios-arrow-down"></Icon>
                 </a>
                  <DropdownMenu slot="list">
                     <DropdownItem>我的信息</DropdownItem>
                     <DropdownItem>修改密码</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
            </span>
            &nbsp;|&nbsp;
            <span @click="exit">退出系统</span>
          </div>
        </div>
      </Header>
      <Content>
        <div class="top">
          <div style="width: 70%">实验室系统</div>
          <div class="user-info">

          </div>
        </div>
        <div style="background-color: #2d8cf0;">
          <div class="nav">
            <Router-link to="/homePage">
              <MenuItem name="1">首页</MenuItem>
            </Router-link>
            <Router-link to="/userIndex" v-if="level === 0">
              <MenuItem name="2">账户管理</MenuItem>
            </Router-link>
            <Router-link to="/teachIndex">
              <MenuItem name="3">教务管理</MenuItem>
            </Router-link>
            <Router-link to="/labIndex">
              <MenuItem name="4">实验室管理</MenuItem>
            </Router-link>
            <Router-link to="/deviceIndex">
              <MenuItem name="5">设备管理</MenuItem>
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
            return {
              level: null,  //0-管理员  1-教师  2-设备管理员  3-学生
              nowTime: '',
              userInfo: {
                name: '',
                userName: ''
              }
            }
        },

      created() {
          this.getNowTime();
          this.level = JSON.parse(localStorage.getItem('loginInfo')).level;
          this.userInfo.name = JSON.parse(localStorage.getItem('loginInfo')).name;
      },

        methods: {
          //获取当前时间
          getNowTime() {
            let date = new Date();
            let year=date.getFullYear(); //获取当前年份
            let mon=date.getMonth()+1; //获取当前月份
            let da=date.getDate(); //获取当前日
            let day=date.getDay(); //获取当前星期几
            let week;
            if (day === 1){
              week = "一";
            }
            else if (day === 2){
              week = "二";
            }
            else if (day === 3){
              week = "三";
            }
            else if (day === 4){
              week = "四";
            }
            else if (day === 5){
              week = "五";
            }
            else if (day === 6){
              week = "六";
            }
            else if (day === 0){
              week = "日";
            }
            this.nowTime=year+"年"+mon+'月'+da+'日'+" "+'星期'+week;
          },

          //退出,回到登录页面
          exit() {
            localStorage.removeItem('loginInfo');
            this.$router.push({
              name: 'login'
            })
          },
        }
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
  .user-info {
    width: 29%;
    height: 90%;
    margin-top: 0.5%;
    padding: 12px;
    background-color: rgba(1, 1, 1, 0.3);
  }
.top {
  background: #fff;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 150px;
  background: url("./img/login_bg.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
}
  .nav {
    display: flex;
    width: 80%;
    margin: 0 auto;
    font-size: 14px;
    color: #fff;
  }
a {
  color: #fff;
}
a:hover {
  background-color: #1205ff;
}
  .user-top:hover {
    background-color: #515a6e;
  }
</style>
