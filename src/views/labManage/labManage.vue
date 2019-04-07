<template>
  <div>
    <div class="user-manage">
      <div style="display: flex;margin-top: 10px;margin-bottom: 10px">
        <!--<Select v-model="sortValue" style="width:150px">-->
          <!--<Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
        <!--</Select>-->
      </div>
      <div>
        <Button type="primary" style="height: 33px;margin-top: 10px;" @click="isAdd = true" v-if="level === 0">添加实验室</Button>
      </div>
    </div>
    <Table border ref="selection" :columns="columns4" :data="labList"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: flex-end">
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
    </div>

    <!--添加实验室-->
    <Modal
      v-model="isAdd"
      title="添加实验室"
      @on-ok="addLab">
      <div>
        <Form :model="formItem" :label-width="80">
          <FormItem label="教室编号：">
            <Input v-model="formItem.numb"></Input>
          </FormItem>
          <FormItem label="教室名称：">
            <Input v-model="formItem.romName"></Input>
          </FormItem>
          <FormItem label="教室描述：">
            <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
          </FormItem>
          <FormItem label="使用状态：">
            <RadioGroup v-model="formItem.state">
              <Radio label="0">空闲</Radio>
              <Radio label="1">使用中</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <!--修改实验室信息-->
    <Modal
      v-model="isEdit"
      title="修改实验信息"
      @on-ok="editLab"
      @on-cancel="cancel">
      <div>
        <Form :model="formItem" :label-width="80">
          <FormItem label="教室编号：">
            <Input v-model="formItem.numb"></Input>
          </FormItem>
          <FormItem label="教室名称：">
            <Input v-model="formItem.romName"></Input>
          </FormItem>
          <FormItem label="教室描述：">
            <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
          </FormItem>
          <FormItem label="使用状态：">
            <RadioGroup v-model="formItem.state">
              <Radio label="0">空闲</Radio>
              <Radio label="1">使用中</Radio>
            </RadioGroup>
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
        level: null,
        current: 1,
        labList: [],     //课程列表
        pageNo: 1,pageNo1: 1,
        total: 0,
        columns4: [
          {
            title: '教室编号',
            key: 'numb'
          },
          {
            title: '教室名称',
            key: 'romName'
          },
          {
            title: '负责人',
            key: 'name'
          },
          {
            title: '描述',
            key: 'content'
          },
          {
            title: '使用状态',
            key: 'state',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: this.level === 0? 'block': 'none'
                  },
                  on: {
                    click: () => {
                      this.isEdit = true;
                      this.formItem = params.row;
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: this.level === 1? 'block': 'none'
                  },
                  on: {
                    click: () => {
                      // 申请实验室
                    }
                  }
                }, '申请'),
              ]);
            }
          }
        ],
        isAdd: false,
        isEdit: false,
        formItem: {
          id:null,
          numb: '',
          romName: '',
          content: '',
          state: 0,
          userId: this.$store.state.loginInfo.userId,
        }
      }
    },

    created() {
      this.getLabList();
      this.formItem.teacherUserId = this.$store.state.loginInfo.userId;
      this.level = this.$store.state.loginInfo.level;
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getLabList();
      },
      //获取实验室列表
      getLabList() {
        let that = this;
        let url = that.BaseConfig + '/selectRomsAll';
        let params = {
          pageNo: that.pageNo,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            console.log('实验室列表', data);
            if(data.retCode === 0) {
              that.labList = data.data.data;
              that.total = data.data.total;
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //添加实验室
      addLab() {
        let that = this;
        let url = that.BaseConfig + '/insertRoms';
        that.formItem.state = parseInt(that.formItem.state);
        let data = that.formItem;
        that
          .$http(url,'', data, 'post')
          .then(res => {
            if(res.data.retCode === 0) {
              that.$Message.success('创建实验室成功');
              that.formItem = {
                id:null,
                numb: '',
                romName: '',
                content: '',
                state: 0,
                userId: this.$store.state.loginInfo.userId,
              };
              that.getLabList();
            } else {
              that.$Message.error(res.data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //修改实验室信息,修改负责人，在已有系统管理员中选择
      editLab() {
        let that = this;
        let url = that.BaseConfig + '/updateRoms';
        that.formItem.state = parseInt(that.formItem.state);
        that.formItem.userId = that.$store.state.loginInfo.userId;
        let data = that.formItem;
        that
          .$http(url,'', data, 'post')
          .then(res => {
            if(res.data.retCode === 0) {
              that.$Message.success('修改成功');
              that.getLabList();
            } else {
              that.$Message.error(res.data.retMsg);
            }
            that.formItem = {
              id:null,
              numb: '',
              romName: '',
              content: '',
              state: 0,
              userId: this.$store.state.loginInfo.userId,
            };
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },
      cancel() {
        let that = this;
        that.formItem = {
          id:null,
          numb: '',
          romName: '',
          content: '',
          state: 0,
          userId: this.$store.state.loginInfo.userId,
        };
      },

    }
  }
</script>

<style lang="less" scoped>
  .user-manage {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
</style>
