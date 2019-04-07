<template>
    <div>
      <Table border ref="selection" :columns="columns4" :data="userInfo"></Table>
      <div style="margin-top: 20px; display: flex;justify-content: flex-end">
        <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
      </div>
      <!--分配权限-->
      <Modal
        v-model="modal"
        title="分配权限"
        @on-ok="ok"
      >
        <div>
          <Form ref="editInfo" :model="editInfo" :label-width="80">
            <FormItem label="身份：">
              <Select v-model="editInfo.identityId" style="width:200px">
                <Option v-for="item in identityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
      </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              current: 1,
              loginInfo:'',
              identityList: [],
              editInfo: {
                id: null,
                userName: '',
                name:'',
                identityId: null,
                job: ''
              },
              modal: false,
              userInfo: [],    //用户列表,配合接口请求时，为了搭配分页使用要有两个动态参数pageNum,pageNo，条数与页数。
              columns4: [
                {
                  title: '账户',
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
                            this.modal = true;
                            this.editInfo.id = params.row.userId;
                            this.editInfo.identityId = params.row.identityId;
                            this.editInfo.userName = params.row.userName;
                            this.editInfo.name = params.row.name;
                            this.editInfo.job = params.row.job;
                          }
                        }
                      }, '分配'),
                    ]);
                  }
                }
              ],
              pageNo: 1,
              total:0,
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

          //修改身份
          ok() {
            let that = this;
            let url = that.BaseConfig + '/updateUser';
            let data = that.editInfo;
            that
              .$http(url,'', data, 'post')
              .then(res => {
                if(res.data.retCode === 0) {
                  that.$Message.success('分配权限成功');
                  that.modal = false;
                  that.getInfo();
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },
        }
    }
</script>

<style scoped>

</style>
