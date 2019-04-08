<template>
    <div class="dev-manage">
      <div style="display: flex;"><Button type="primary" style="height: 33px;margin-bottom: 10px" @click="isAdd = true">添加设备</Button></div>
      <div class="dev-search"></div>
      <div>
        <Table border ref="selection" :columns="columns4" :data="devList"></Table>
        <div style="margin-top: 20px; display: flex;justify-content: flex-end">
          <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
        </div>
      </div>

      <!--添加设备-->
      <!--添加设备时不会分配教室-->
      <Modal
        v-model="isAdd"
        title="添加设备"
        @on-ok="addDev"
      >
        <div>
          <Form :model="equipment" :label-width="80">
            <FormItem label="设备编号：" >
              <Input v-model="equipment.serNumb" style="width:200px"></Input>
            </FormItem>
            <FormItem label="设备类型：">
              <Select v-model="equipment.eqClassId" style="width:200px">
                <Option v-for="item in devSortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="维修时间：" >
              <Input v-model="equipment.repairTimes" style="width:200px"></Input>
            </FormItem>
            <FormItem label="设备状态：">
              <RadioGroup v-model="state">
                <Radio label="0">正常</Radio>
                <Radio label="1">报修</Radio>
                <Radio label="2">报废</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="购买时间：">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="Select date" v-model="equipment.buyTime"></DatePicker>
                </Col>
              </Row>
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
              pageNo: 1, pageNo1: 1,
              total: 0,
              devList: [],   //设备
              sortList: [],
              devSortList: [], //设备分类
              isAdd: false,
              state: '0',
              equipment: {
                serNumb: '',      //设备编号
                eqClassId: null,  //类别
                romId: null,      //分配教室
                state: parseInt(this.state),         //设备状态 0-正常 1-保修  2-报废
                buyTime: '',      //购买时间
                updateTime: new Date().getTime(),   //更新时间
                repairTimes: null,  //维修时间
              },
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
          this.getDevSortList();    //获取设备类型列表
          this.getDevList();
        },

        methods: {
          //改变页数
          pageChange(val) {
            this.pageNo = val;
            this.getDevList();
          },

          //获取全部设备列表
          getDevList() {
            let that = this;
            let url = that.BaseConfig + '/selectEquipmentAll';
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
                that.$Message.error('1请求错误');
              })
          },

          //获取设备类型列表
          getDevSortList() {
            let that = this;
            let url = that.BaseConfig + '/selectEquipmentClassAll';
            let params = {
              pageNo: that.pageNo1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode === 0) {
                  that.sortList = that.sortList.concat(data.data.data);
                  if(that.devSortList < data.data.total) {
                    that.pageNo1++;
                    that.getDevSortList();
                  }
                  that.sortList.map(item => {
                    that.devSortList.push({
                      value: item.id,
                      label: item.typeName
                    })
                  })
                } else {
                  that.$Message.error(data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('2请求错误');
              })
          },

          //添加设备
          addDev() {
            let that = this;
            let url = that.BaseConfig + '/insertEquipment';
            that.equipment.buyTime = new Date(that.equipment.buyTime).getTime();
            that.equipment.updateTime = new Date(that.equipment.updateTime).getTime();
            let data = that.equipment;
            that
              .$http(url, '', data, 'post')
              .then(res => {
                console.log(res)
                // if(res.data.retCode === 0) {
                //   that.$Message.success('添加设备成功');
                //   that.isAdd = false;
                //   this.getDevSort();
                // } else {
                //   that.$Message.error(res.data.retMsg);
                //   console.log(res.data.retMsg)
                // }
              })
              .catch(err => {
                that.$Message.error('3请求错误');
              })
          },

        }
    }
</script>

<style lang="less" scoped>
  .dev-manage {
    padding: 12px;
    .dev-search {
      border-radius: 10px;
      border: 1px solid #34a8ff;
      height: 70px;
      margin-bottom: 10px;
    }
  }
</style>
