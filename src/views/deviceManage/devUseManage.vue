<template>
    <div>
      <Table border ref="selection" :columns="columns4" :data="devList"></Table>
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
              pageNo: 1,
              total: 0,
              devList: [],   //设备
              columns4: [
                {
                  title: '编号',
                  key: 'serNumb'
                },
                {
                  title: '类别',
                  key: 'eqClassName'
                },
                {
                  title: '状态',
                  key: 'state'
                },
                {
                  title: '购买时间',
                  key: 'buyTime'
                },
                {
                  title: '更新时间',
                  key: 'updateTime'
                },
                {
                  title: '分配教室',
                  key: 'romNumb'
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
                    ]);
                  }
                }
              ],
            }
        },

      created() {
        this.getDevUseList();
      },

        methods: {
          //获取已分配的设备列表
          getDevUseList() {
            let that = this;
            let url = that.BaseConfig + '/selectEquipmentAllocated';
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
                  that.devList = data.data.data;
                  console.log(that.devList)
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

<style scoped>

</style>
