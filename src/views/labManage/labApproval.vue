<template>
  <div>
    <div style="display: flex;justify-content: space-around">
      <div class="applying">待审批</div>
      <div class="applying approved">已审批</div>
      <div class="applying completed">已处理</div>
    </div>
    <Table border ref="selection" :columns="columns" :data="applyList"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: flex-end">
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageNo: 1,
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
              console.log(that.applyList)
              that.total = data.data.total;
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
.applying {
  width: 20%;
  height: 80px;
  border-radius: 20px;
  background-color: #f9432be0;
  margin-bottom: 15px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  line-height: 80px;
  text-align: center;
}
  .approved {
    background-color: #cafa0ab8;
  }
  .completed {
    background-color: #1c59f0bd;
  }
</style>
