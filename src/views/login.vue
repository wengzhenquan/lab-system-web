<template>
    <div class="login-box">
      <div class="login">
        <p>登录</p>
        <p>用户名：<Input v-model="userName" placeholder="请输入账号" style="width: 222px" /></p>
        <p>密&nbsp;&nbsp; 码：<Input v-model="pwd" placeholder="请输入密码" style="width: 222px" /></p>
        <div class="login-btn"><Button type="primary" style="width: 100%" @click="login">登录</Button></div>
        <div class="choiceIde">
          <RadioGroup v-model="levelValue">
            <Radio label="学生"></Radio>
            <Radio label="教师"></Radio>
            <Radio label="设备管理员"></Radio>
            <Radio label="系统管理员"></Radio>
          </RadioGroup>
        </div>
        <p><span style="color: #2d78f4">免费注册</span><span>忘记密码？</span></p>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              userName: '',
              pwd: '',
              levelValue: '学生',
            }
        },

        methods: {
          login() {
            let that = this;
            let url = that.BaseConfig + '/login';
            let level;
            if(that.levelValue === '系统管理员') {
              level = 0;
            } else if(that.levelValue === '设备管理员') {
              level = 2;
            } else if(that.levelValue === '教师') {
              level = 1;
            } else if(that.levelValue === '学生') {
              level = 3;
            }
            let params = {
              userName: that.userName,
              pwd: that.pwd,
              level: level,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                console.log(res);
                if(res.data.retCode === 0) {
                  //把登录信息缓存起来vuex-localStorage
                  localStorage.setItem('loginInfo', JSON.stringify(res.data.data));
                  that.$router.push({
                    path: '/homePage',
                  })
                }
              })
              .catch(err => {
                this.$Message.error('请求错误');
              })
          },
        }
    }
</script>

<style lang="less" scoped>
  .login-box {
    width: 100%;
    height: 100vh;
    background: url("./img/login_bg.jpg");
    background-size: 100% 100%;
    position: relative;
  }
  .login {
    position: absolute;
    left: 38%;
    top: 20%;
    padding: 40px;
    border: 1px solid #fff;
    border-radius: 10px;
    /deep/ .ivu-input {
      border-color: #2d78f4;
    }
    p {
      margin-top: 15px;
      &:nth-child(1) {
        font-size: 20px;
        text-align: center;
        font-weight: 600;
        letter-spacing: 2px;
        color: #2d78f4;
      }
      &:nth-last-child(1) {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
    }
    .login-btn {
      margin: 15px 0 10px;
    }

    .choiceIde {
      margin-top: 18px;
      font-size: 14px;
    }
  }
</style>
