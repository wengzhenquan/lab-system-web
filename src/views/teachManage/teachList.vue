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
      <div class="col">
        <Table border ref="selection" :columns="columns4" :data="courceList"></Table>
      </div>
      <div style="margin-top: 20px; display: flex;justify-content: flex-end">
        <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
      </div>

      <!--添加课程-->
      <div v-if="level === 1">
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
      </div>

      <!--修改课程-->
      <Modal
        v-model="isEdit"
        title="修改课程"
        @on-ok="editCource"
        @on-cancel="editCancel">
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
                  title: '实验课题',
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('p', {
                        style: {
                          color: '#2d8cf0'
                        },
                        on: {
                          click: () => {
                            this.$router.push({
                              path: './experimentTask',
                              query: {
                                courseId: params.row.id,
                              }
                            })
                          }
                        }
                      }, '查看'),
                    ])
                  }
                },
                {
                  title: '学生',
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('p', {
                        style: {
                          color: '#2d8cf0'
                        },
                        on: {
                          click: () => {
                            this.$router.push({
                              path: './studentManage',
                              query: {
                                courseId: params.row.id,
                              }
                            })
                          }
                        }
                      }, '查看'),
                    ])
                  }
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
                            if(this.level === 1) {
                              this.isEdit = true;
                              this.formItem.id = params.row.id;
                              this.getEditItem();
                            } else {
                              this.$Message.warning('无权限操作')
                            }
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
                id: null,
                courseName: '',
                totalScore: null,
                startDate: '',
                endDate: '',
                teacherUserId: null,
              },
              level: null,      //0-管理员  1-教师  2-设备管理员  3-学生
            }
        },

      created() {
          this.level = this.$store.state.loginInfo.level;
          if(this.level === 1) {
            this.formItem.teacherUserId = this.$store.state.loginInfo.userId;
          }
          this.getCourceList();
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
            let params;
            if(that.level === 1) {    //教师只查看自己的课程
              params = {
                pageNo: that.pageNo,
                pageSize: 10,
                teacherUserId: that.formItem.teacherUserId
              };
            } else {     //除教师外可查看全部课程
              params = {
                pageNo: that.pageNo,
                pageSize: 10,
              };
            }
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
            that.formItem.startDate = new Date(that.formItem.startDate).getTime();
            that.formItem.endDate = new Date(that.formItem.endDate).getTime();
            let data = that.formItem;
            console.log(that.formItem)
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

          //获取单个课程
          getEditItem() {
            let that = this;
            let url = that.BaseConfig + '/selectCourseById';
            let params = {
              courseId: that.formItem.id,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode === 0) {
                  that.formItem = data.data;
                } else {
                  that.$Message.error(data.retMsg);
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
            that.formItem.startDate = new Date(that.formItem.startDate).getTime();
            that.formItem.endDate = new Date(that.formItem.endDate).getTime();
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
           // this.formItem = {
           //    courseName: '',
           //    totalScore: null,
           //    startDate: '',
           //    endDate: '',
           //    teacherUserId: null,
           //  }
          },
          editCancel() {
            console.log(this.formItem)
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
