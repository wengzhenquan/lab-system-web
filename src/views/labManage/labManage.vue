<template>
  <div>
    <div class="user-manage">
      <Button type="primary" style="height: 33px;margin-top: 10px;" @click="isAdd = true">添加实验室</Button>
      <div style="display: flex; justify-content: flex-end;margin-top: 10px;margin-bottom: 10px">
        <Select v-model="sortValue" style="width:150px">
          <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div style="width: 270px;margin-left: 3px"><Input search enter-button="搜索" placeholder="输入要查找的内容" v-model="name" /></div>
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
      @on-ok="addLab"
      @on-cancel="cancel">
      <div>
        <Form :model="formItem" :label-width="80">
          <FormItem label="教室编号：">
            <Input v-model="formItem.numb"></Input>
          </FormItem>
          <FormItem label="教室名称：">
            <Input v-model="formItem.romsName"></Input>
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
            <Input v-model="formItem.romsName"></Input>
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
        current: 1,
        labList: [],     //课程列表
        pageNo: 1,
        total: 0,
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
        name: '',     //查找内容
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
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.isEdit = true;
                      this.formItem = params.row;
                    }
                  }
                }, '编辑'),
              ]);
            }
          }
        ],
        isAdd: false,
        isEdit: false,
        formItem: {
          // id:null,
          numb: '',
          romsName: '',
          content: '',
          state: 0,
          userId: this.$store.state.loginInfo.userId,
        }
      }
    },

    created() {
      this.getLabList();
      this.formItem.teacherUserId = this.$store.state.loginInfo.userId;
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
      },
      //获取实验室列表
      getLabList() {
        let that = this;
        let url = that.BaseConfig + '/selectRomsAll';
        let data = {
          pageNo: that.pageNo,
          pageSize: 10,
        };
        that
          .$http(url, '', data, 'post')
          .then(res => {
            console.log('实验室列表', res);
            if(res.data.retCode === 0) {
              // that.labList = data.data.data;
              // that.total = data.data.total;
            } else {
              that.$Message.error(res.data.retMsg);
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
        that.formItem.state = parseInt(that.formItem.state)
        let data = that.formItem;
        console.log(data)
        that
          .$http(url,'', data, 'post')
          .then(res => {
            console.log('创建实验室', res);
            if(res.data.retCode === 0) {
              that.$Message.success('创建实验室成功');
              that.getLabList();
            } else {
              that.$Message.error(res.data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //修改实验室信息
      editLab() {
        let that = this;
        let url = that.BaseConfig + '/updateRoms';
        let data = that.formItem;
        that
          .$http(url,'', data, 'post')
          .then(res => {
            console.log('修改实验室信息', res);
            if(res.data.retCode === 0) {
              that.$Message.success('修改成功');
              that.getLabList();
            } else {
              that.$Message.error(res.data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //取消
      cancel() {
        this.formItem = {
          id:null,
          numb: '',
          romsName: '',
          content: '',
          state: 0,
          userId: this.$store.state.loginInfo.userId,
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .user-manage {
    display: flex;
    justify-content: space-between;
  }
</style>
