<template>
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
        <FormItem>
          <Poptip
            confirm
            title="确定创建该用户?"
            @on-ok="ok"
            >
            <Button>创建</Button>
          </Poptip>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
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
              formValidate: {
                userName: '',
                name: '',
                pwd: '',
                pwdCheck: '',    //再次确认密码
                job: '',
                identityId: 3,
              },
              identityList: [],    //身份列表

              //表单验证
              ruleValidate: {
                userName: [
                  { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                name: [
                  { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                pwd: [
                  {required: true, validator: validatePass, trigger: 'blur' }
                ],
                pwdCheck: [
                  {required: true, validator: validatePassCheck, trigger: 'blur' }
                ],
                identityId: [
                  {required: true, validator: validatePassCheck, trigger: 'blur' }
                ],
              }
            }
        },

        created() {
          this.getIdentityList();
        },

        methods: {
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
                  identityList.map(item=> {
                    that.identityList.push({
                      value: item.level,
                      label: item.identityName,
                    })
                  });
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //创建用户
          ok () {
            let that = this;
            let url = that.BaseConfig + '/insertUser';
            let data = that.formValidate;
            that
              .$http(url, '', data, 'post')
              .then(res => {
                if(res.data.retCode === 0) {
                 console.log(res)
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //重置
          handleReset (name) {
            this.$refs[name].resetFields();
          }
        },
    }
</script>

<style>
  .ivu-form-item-label {
    width: 100px !important;
  }
  .ivu-form-item-content {
    margin-left: 100px !important;
  }
</style>

<style lang="less" scoped>

</style>
