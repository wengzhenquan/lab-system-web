<template>
    <div>
      <div class="user-manage">
        <Button type="primary" style="height: 33px;margin-top: 10px;" @click="isAdd = true">添加课程</Button>
        <div style="display: flex; justify-content: flex-end;margin-top: 10px;margin-bottom: 10px">
          <Select v-model="sortValue" style="width:150px">
            <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div style="width: 270px;margin-left: 3px"><Input search enter-button="搜索" placeholder="输入要查找的内容" v-model="name" /></div>
        </div>
      </div>
      <Table border ref="selection" :columns="columns4" :data="courceList"></Table>
      <div style="margin-top: 20px; display: flex;justify-content: flex-end">
        <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
      </div>

      <!--添加课程-->
      <Modal
        v-model="isAdd"
        title="添加课程"
        @on-ok="addCource"
        @on-cancel="cancel">
        <div>
          <Form :model="formItem" :label-width="80">
            <FormItem label="课程名称：">
              <Input v-model="formItem.courseName"></Input>
            </FormItem>
            <FormItem label="课程学分：">
              <Input v-model="formItem.totalScore"></Input>
            </FormItem>
            <FormItem label="开始时间：">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="Select date" v-model="formItem.startDate"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="结束时间：">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="Select date" v-model="formItem.endDate"></DatePicker>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
      </Modal>

      <!--修改课程-->
      <Modal
        v-model="isEdit"
        title="修改课程"
        @on-ok="editCource"
        @on-cancel="cancel">
        <div>
          <Form :model="formItem" :label-width="80">
            <FormItem label="课程名称：">
              <Input v-model="formItem.courseName"></Input>
            </FormItem>
            <FormItem label="课程学分：">
              <Input v-model="formItem.totalScore"></Input>
            </FormItem>
            <FormItem label="开始时间：">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="Select date" v-model="formItem.startDate"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="结束时间：">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="Select date" v-model="formItem.endDate"></DatePicker>
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
              courceList: [],     //课程列表
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
                  title: '课程名',
                  key: 'courseName'
                },
                {
                  title: '学分',
                  key: 'totalScore'
                },
                {
                  title: '开始时间',
                  key: 'startDate'
                },
                {
                  title: '结束时间',
                  key: 'endDate'
                },
                {
                  title: '课任老师',
                  key: 'name',
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
                courseName: '',
                totalScore: null,
                startDate: '',
                endDate: '',
                teacherUserId: null,
              }
            }
        },

      created() {
          this.getCourceList();
          this.formItem.teacherUserId = this.$store.state.loginInfo.userId;
      },

        methods: {
          //改变页数
          pageChange(val) {
            this.pageNo = val;
            this.getInfo();
          },
          //获取课程列表
          getCourceList() {
            let that = this;
            let url = that.BaseConfig + '/selectCourseAll';
            let params = {
              pageNo: that.pageNo,
              pageSize: 10,
              // teacherUserId  要区分老师和管理要，老师加上id
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode === 0) {
                  that.courceList = data.data.data;
                  that.total = data.data.total;
                } else {
                  that.$Message.error(data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //添加课程
          addCource() {
            let that = this;
            let url = that.BaseConfig + '/insertCourse';
            let data = that.formItem;
            that
              .$http(url,'', data, 'post')
              .then(res => {
               console.log('创建课程', res);
                if(res.data.retCode === 0) {
                  that.$Message.success('添加课程成功');
                  that.getCourceList();
                } else {
                  that.$Message.error(res.data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //修改课程信息
          editCource() {
            let that = this;
            let url = that.BaseConfig + '/updateCourse';
            let data = that.formItem;
            that
              .$http(url,'', data, 'post')
              .then(res => {
                console.log('创建课程', res);
                if(res.data.retCode === 0) {
                  that.$Message.success('修改成功');
                  that.getCourceList();
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
              courseName: '',
              totalScore: null,
              startDate: '',
              endDate: '',
              teacherUserId: null,
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
