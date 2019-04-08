<template>
    <div>
      <div style="display: flex;justify-content: space-around">
        <div class="applying">申请中</div>
        <div class="applying approved">已审批</div>
        <div class="applying completed">已处理</div>
      </div>
      <Table border ref="selection" :columns="columns" :data="applyList"></Table>
      <div style="margin-top: 20px; display: flex;justify-content: flex-end">
        <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
      </div>

      <Modal
        v-model="isApply"
        title="Common Modal dialog box title"
        @on-ok="labApply">
        <div>
          <div class="apply-title">实验室申请表</div>
          <div style="width: 90%; margin: 0 auto; border: 1px solid #ccc;border-radius: 10px;padding: 12px">
            <Form :model="formItem" :label-width="100">
              <FormItem label="申请教室编号：">
                <Select v-model="formItem.romId" style="width:200px">
                  <Option v-for="item in labSelectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="使用开始时间：">
                <Row>
                  <Col span="6">
                    <DatePicker type="date" placeholder="Select date" v-model="startDate"></DatePicker>
                  </Col>
                  <Col span="4" style="text-align: center">-</Col>
                  <Col span="11">
                    <TimePicker type="time" placeholder="Select time" v-model="startTime"></TimePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="使用结束时间：">
                <Row>
                  <Col span="6">
                    <DatePicker type="date" placeholder="Select date" v-model="endDate"></DatePicker>
                  </Col>
                  <Col span="4" style="text-align: center">-</Col>
                  <Col span="11">
                    <TimePicker type="time" placeholder="Select time" v-model="endTime"></TimePicker>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </div>
        </div>
      </Modal>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        isApply: false,
        labList: [],     //实验室列表
        labSelectList: [],
        pageNo: 1,
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        formItem: {
          userId: this.$store.state.loginInfo.userId,
          romId: null,
          logId: null,
          handleUserId: null,
          startTime: '',  //开始使用时间
          endTime: '',    //结束使用时间
          creatTime: new Date().getTime(),  //申请时间
          state: 0,    //0-申请中  1-已审批  2-已处理
        },
        pageNo1: 1,
        total:0,
        current:1,
        applyList: [],   //实验室申请列表  管理员看到全部，教师看到自己的申请记录
        columns: [
          {
            title: '申请人',
            key: 'name'
          },
          {
            title: '申请教室',
            key: 'romName'
          },
          {
            title: '使用时间',
            key: 'startTime'
          },
          {
            title: '结束使用',
            key: 'endTime'
          },
          {
            title: '申请状态',   // 0 - 审核中，1-已审批， 2-已处理
            key: 'state',
          },
          {
            title: '处理人',
            key: 'handleUser',
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

                    }
                  }
                }, '编辑'),
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
                      // 申请实验室
                    }
                  }
                }, '申请'),
              ]);
            }
          }
        ],
      }
    },

    created() {
      this.getLabList();
      this.getApplyList();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getApplyList();
      },

      //获取实验室申请列表
      getApplyList() {
        let that = this;
        let url = that.BaseConfig + '/selectRomLogAll';
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
              that.applyList = data.data.data;
              that.total = data.data.total;
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
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
            if(data.retCode === 0) {
              that.labList = that.labList.concat(data.data.data);
              if(that.labList.length < data.data.total) {
                that.pageNo++;
                that.getLabList();
              }
              that.labList.map(item => {
                that.labSelectList.push({
                  value: item.id,
                  label: item.numb
                })
              });
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //申请教室
      labApply() {
        let that = this;
        let date = this.startDate.getFullYear() + '-' + (this.startDate.getMonth() + 1) + '-' + this.startDate.getDate()+ ' ' + this.startTime;
        that.formItem.startTime = new Date(date).getTime();
        let endDate = this.endDate.getFullYear() + '-' + (this.endDate.getMonth() + 1) + '-' + this.endDate.getDate()+ ' ' + this.endTime;
        that.formItem.endTime = new Date(endDate).getTime();
        console.log(that.formItem)

        let url = that.BaseConfig + '/insertRomLog';
        let params = that.formItem;
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              console.log(data)
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },
    }
  }
</script>

<style lang="less" scoped>
.apply-title {
  width: 100%;
  font-size: 20px;
  text-align: center;
  letter-spacing: 1px;
  font-weight: 600;
  height: 40px;
}
.applying {
  width: 20%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-radius: 20px;
  background-color: #f9432be0;
  margin-bottom: 15px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}
.approved {
  background-color: #cafa0ab8;
}
.completed {
  background-color: #1c59f0bd;
}
</style>
