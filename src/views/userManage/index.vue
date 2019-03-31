<template>
  <div>
    <div class="user-manage">
      <Button type="primary" style="height: 33px;margin-top: 10px;" @click="goAddUser">添加用户</Button>
      <div style="display: flex; justify-content: flex-end;margin-top: 10px;margin-bottom: 10px">
        <Select v-model="sortValue" style="width:150px">
          <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div style="width: 270px;margin-left: 3px"><Input search enter-button="搜索" placeholder="输入要查找的内容" v-model="name" @on-click="searchUser"/></div>
      </div>
    </div>
    <Table border ref="selection" :columns="columns4" :data="userInfo"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: flex-end">
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
    </div>

    <!--添加用户模态框-->
    <Modal
      v-model="isAddUser"
      title="添加用户"
      @on-ok="handleSubmit('formValidate')"
      @on-cancel=" handleReset('formValidate')">
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="用户名：" prop="userName">
            <Input v-model="formValidate.userName" placeholder="输入用户名"></Input>
          </FormItem>
          <FormItem label="密码：" prop="pwd">
            <Input type="password" v-model="formValidate.pwd" placeholder="输入密码"></Input>
          </FormItem>
          <FormItem label="确认密码：" prop="pwdCheck">
            <Input type="password" v-model="formValidate.pwdCheck" placeholder="再次输入密码"></Input>
          </FormItem>
          <FormItem label="姓名：" prop="name">
            <Input v-model="formValidate.name" placeholder="输入姓名"></Input>
          </FormItem>
          <FormItem label="身份：" prop="identityId">
            <Select v-model="formValidate.identityId" style="width:200px">
              <Option v-for="item in identityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="职务：" prop="job">
            <Input v-model="formValidate.job" placeholder="如：高数老师"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!--编辑用户模态框-->
    <Modal
      v-model="isEditUser"
      title="编辑用户信息"
      @on-ok="editSubmit('formValidate')"
      @on-cancel=" handleReset('formValidate')">
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="用户名：" prop="userName">
            <Input v-model="formValidate.userName" placeholder="输入用户名" readonly></Input>
          </FormItem>
          <FormItem label="密码：" prop="pwd">
            <Input type="password" v-model="formValidate.pwd" placeholder="******" disabled></Input>
          </FormItem>
          <FormItem label="确认密码：" prop="pwdCheck">
            <Input type="password" v-model="formValidate.pwdCheck" placeholder="******" disabled></Input>
          </FormItem>
          <FormItem label="姓名：" prop="name">
            <Input v-model="formValidate.name" placeholder="输入姓名"></Input>
          </FormItem>
          <FormItem label="身份：" prop="identityId">
            <Select v-model="formValidate.identityId" style="width:200px">
              <Option v-for="item in identityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="职务：" prop="job">
            <Input v-model="formValidate.job" placeholder="如：高数老师"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formValidate.pwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField('pwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formValidate.pwd) {
          callback(new Error('密码不一致!'));
        } else {
          callback();
        }
      };
      const validateAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Age cannot be empty'));
        }
        // 模拟异步验证效果
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please enter a numeric value'));
          } else {
            if (value < 18) {
              callback(new Error('Must be over 18 years of age'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        current: 1,
        loginInfo:'',
        userInfo: [],    //用户列表,配合接口请求时，为了搭配分页使用要有两个动态参数pageNum,pageNo，条数与页数。
        columns4: [
          {
            title: '学号',
            key: 'userName'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '身份',
            key: 'identityName'
          },
          {
            title: '职位',
            key: 'job'
          },
          {
            title: '操作',
            key: 'action',
            width: 140,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.isEditUser = true;
                      this.formValidate.id = params.row.userId;
                      this.formValidate.userName = params.row.userName;
                      this.formValidate.name = params.row.name;
                      this.formValidate.job = params.row.job;
                      this.formValidate.identityId = params.row.identityId;
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.deleteUser(params.row.userId);
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        pageNo: 1,
        total:0,
        name: '',
        sortList: [
          {
            value: 'userName',
            label: '学号'
          },
          {
            value: 'name',
            label: '姓名'
          },
        ],    //查找条件
        sortValue:'',
        isAddUser: false,
        formValidate: {
          userName: '',
          name: '',
          pwd: '',
          pwdCheck: '',    //再次确认密码
          job: '',
          identityId: 3,
          id: '',
        },
        identityList: [],      //身份列表
        ruleValidate: {
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
        },    //表单验证
        isEditUser: false,
        userId: '',
      }
    },

    created() {
      this.getInfo();
      this.getIdentityList();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
      },

      //获取用户列表
      getInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectUsersAll';
        let params = {
          pageNo: that.pageNo,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              that.userInfo = data.data.data;
              that.total = data.data.total;
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //获取身份列表
      getIdentityList() {
        let that = this;
        let url = that.BaseConfig + '/selectIdentityList';
        let data = null;
        that
          .$http(url, '', data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              let identityList = data.data;
              console.log(identityList)
              identityList.map(item=> {
                that.identityList.push({
                  value: item.id,
                  label: item.identityName,
                })
              });
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //添加用户表单验证
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.formValidate.pwd === ''|| this.formValidate.pwd=== 'undefiend') {
              this.$Message.error('请设置密码!');
            } else {
              this.addUser();
            }
          } else {
            this.$Message.error('信息不完整!');
          }
        })
      },

      //编辑用户表单验证
      editSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.editUser();
          } else {
            this.$Message.error('信息不完整!');
          }
        })
      },

      //重置表单
      handleReset (name) {
        this.$refs[name].resetFields();
        this.isAddUser = false;
      },

      //创建用户
      addUser () {
        let that = this;
        let url = that.BaseConfig + '/insertUser';
        let data = that.formValidate;
        that
          .$http(url, '', data, 'post')
          .then(res => {
            if(res.data.retCode === 0) {
              that.$Message.success('创建成功');
              that.formValidate = {
                userName: '',
                name: '',
                pwd: '',
                pwdCheck: '',    //再次确认密码
                job: '',
                identityId: 3,
                id: '',
              };
              that.isAddUser = false;
              that.getInfo();
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //删除用户
      deleteUser(userId) {
        let that = this;
        let url = that.BaseConfig + '/deleteUser';
        let params = {
          UserId: userId,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            if(res.data.retCode === 0) {
               that.$Message.success('删除成功');
               that.getInfo();
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //搜索用户(学号、姓名、身份)
      searchUser() {
        let that = this;
        let url = that.BaseConfig + '/selectUsersAll';
        let params = {
          name: that.name,
          // userName: that.userName,
          // identityName: that.identityName,
          pageNo: 1,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params , data, 'get')
          .then(res =>{
            console.log(res)
            data = res.data;
            if(data.retCode === 0) {
              that.userInfo = data.data.data;
              that.total = data.data.total;
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //弹出添加用户页面
      goAddUser() {
        this.isAddUser = true;
      },

      //修改用户信息
      editUser() {
        let that = this;
        let url = that.BaseConfig + '/updateUser';
        let data = that.formValidate;
        that
          .$http(url,'', data, 'post')
          .then(res => {
            console.log(res)
            if(res.data.retCode === 0) {
              that.$Message.success('修改成功');
              that.isEditUser = false;
              that.getInfo();
            } else {
              that.$Message.error(res.data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },
    },
  }
</script>

<style lang="less" scoped>
  .user-manage {
    display: flex;
    justify-content: space-between;
  }
</style>
