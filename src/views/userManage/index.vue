<template>
  <div>
    <div class="user-manage">
      <div style="display: flex">
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
  </div>
</template>

<script>
  export default {
    data() {
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
            title: '用户权限',
            key: 'level'
          },
          {
            title: '操作',
            key: 'action',
            width: 170,
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
                      // console.log(params.row)
                      this.$router.push({
                        path: '/index/assnManage/userInfomation',
                        query: {
                          userInfo: params.row,
                        }
                      })
                    }
                  }
                }, '查看'),
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
                      this.$router.push({
                        path: '/index/assnManage/userInfomation',
                        query: {
                          userInfo: this.userInfo,
                        }
                      })
                    }
                  }
                }, '编辑'),
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
      }
    },

    created() {
      this.getInfo();
    },

    methods: {
      //全选
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
      },

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
            console.log(data)
            if(data.retCode === 0) {
              that.userInfo = data.data.data;
              that.total = data.data.total;
              console.log(that.userInfo)
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //删除用户
      cancelUser(userId) {
        let that = this;
        let url = that.BaseConfig + '/deleteUser';
        let params = {
          UserId: userId,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            console.log(res)
            // data = res.data;
            // if(data.retCode === 0) {
            //    that.$Message.success('删除成功');
            //    that.getInfo();
            // }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //搜索用户(学号、姓名、身份)
      searchUser() {
        console.log(1)
        let that = this;
        let url = that.BaseConfig + '/selectUsersAll';
        let params = {
          name: that.name,
          // userName: that.userName,
          // identityName: that.identityName,
          pageNo: 0,
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

    },
  }
</script>

<style lang="less" scoped>
  .user-manage {
    margin-bottom: 7px;display: flex;justify-content: flex-end;
  }
</style>
