<template>
  <div>
    <div class="user-manage" style="justify-content: flex-end" v-if="loginInfo.level === 1">
      <Button type="primary" style="height: 33px;margin-top: 10px;" @click="isAdd = true">添加实验课题</Button>
    </div>
    <div style="display:flex;margin-bottom: 8px;margin-top: 8px">
      <div style="width: 40%">
        课程名称：
        <Select v-model="formItem.courseId" style="width:170px" @on-change="choiceCource">
          <Option v-for="item in courList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        实验教室：
        <Select v-model="formItem.romId" style="width:170px">
          <Option v-for="item in roList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <Table border ref="selection" :columns="columns4" :data="taskList"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: flex-end">
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
    </div>

    <!--添加实验任务-->
    <!--老师才可添加实验任务、且课程必须是此老师所开设的课程-->
    <div v-if="loginInfo.level === 1">
      <Modal
        v-model="isAdd"
        title="添加实验任务"
        @on-ok="addTask"
        @on-cancel="cancel">
        <div>
          <Form :model="formItem" :label-width="80">
            <FormItem label="实验题目：">
              <Input v-model="formItem.title"></Input>
            </FormItem>
            <FormItem label="实验内容：">
              <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="课程名称：">
              <Select v-model="formItem.courseId" style="width:200px">
                <Option v-for="item in courList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="教室编号：">
              <Input v-model="formItem.numb"></Input>
            </FormItem>
            <FormItem label="教室名称：">
              <Select v-model="formItem.romId" style="width:200px">
                <Option v-for="item in roList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
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

    <Modal
      v-model="isRead"
      title="实验内容"
      >
      <p>
        {{taskContent}}
      </p>
    </Modal>

    <!--修改实验任务-->
    <Modal
      v-model="isEdit"
      title="修改实验任务"
      @on-ok="editTask"
      @on-cancel="cancel">
      <div>
        <Form :model="formItem" :label-width="80">
          <FormItem label="实验题目：">
            <Input v-model="formItem.title"></Input>
          </FormItem>
          <FormItem label="实验内容：">
            <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
          </FormItem>
          <FormItem label="课程名称：">
            <Select v-model="formItem.courseId" style="width:200px">
              <Option v-for="item in courList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="实验教室：">
            <Select v-model="formItem.romId" style="width:200px">
              <Option v-for="item in roList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
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
        pageNo: 1, pageNo1: 1, pageNo2: 1, total: 0, current: 1,
        taskList: [],     //课程列表
        courceList: [],
        courList:[],      //此用户（教师）开设的课程列表
        romsList: [],
        roList: [],       // 空闲状态的教室列表
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
        isRead: false,    //实验内容modal框
        taskContent: '',  //实验内容
        columns4: [
          {
            title: '实验题目',
            key: 'title'
          },
          {
            title: '实验内容',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('p', {
                  style: {
                    color: '#2d8cf0'
                  },
                  on: {
                    click: () => {
                      this.isRead = true;
                      this.taskContent = params.row.content;
                    }
                  }
                }, '查看'),
              ]);
            }
          },
          {
            title: '教室编号',
            key: 'numb',
          },
          {
            title: '教室名称',
            key: 'romName',
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
            title: '课程名',
            key: 'courseName'
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
                      if(this.$store.state.loginInfo.level === 1) {
                        this.isEdit = true;
                        this.formItem = params.row;
                      } else {
                        this.$Message.warning('无此权限');
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
          title:'',
          content: '',
          courseId: null,
          romId: null,
          startDate: '',
          endDate: '',
          numb: null,
          fileUrl: '',
        },
        loginInfo: '',    //用户登录信息
      }
    },

    created() {
      // 老师进入要先选择实验课程名称，学生进入可查看所有实验任务
      this.loginInfo = this.$store.state.loginInfo;
      this.formItem.courseId = this.$route.query.courseId;
      console.log(this.formItem.courseId)
      if((this.formItem.courseId === undefined || this.formItem.courseId === null)&& this.loginInfo.level === 1)  {
        this.$Message.warning('请先选择课程名称');
      } else {
        this.getTaskList();
      }
      this.getCourceList();
      this.getRomsList();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
      },

      //选择课程，显示对应已有的实验任务
      choiceCource(){
        this.getTaskList();
      },

      //获取此用户开设的课程列表
      getCourceList() {
        let that = this;
        let url = that.BaseConfig + '/selectCourseAll';
        let params = {
          pageNo: that.pageNo1,
          pageSize: 10,
          teacherUserId: that.$store.state.loginInfo.userId,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              that.courceList = that.courceList.concat(data.data.data);
              if(that.courceList < data.data.total) {
                that.pageNo1++;
                that.getCourceList();
              } else {
                that.courceList.map(item=> {
                  that.courList.push({
                    value: item.id,
                    label: item.courseName
                  })
                })
                console.log(1,that.courList)
              }
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //获取空闲-实验室列表
      getRomsList() {
        let that = this;
        let url = that.BaseConfig + '/selectRomsAll';
        let data = {
          pageNo2: that.pageNo2,
          pageSize: 10,
          state: 0
        };
        that
          .$http(url, '', data, 'post')
          .then(res => {
            console.log('实验室列表', res);
            if(res.data.retCode === 0) {
              that.romsList = that.romsList.concat(data.data.data);
              if (that.romsList < data.data.total) {
                that.pageNo2++;
                that.getRomsList();
              } else {
                that.romsList.map(item => {
                  that.roList.push({
                    value: item.id,
                    label: item.romName
                  })
                })
              }
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //获取实验任务列表
      getTaskList() {
        let that = this;
        let url = that.BaseConfig + '/selectExpTeskAll';
        let params;
        if(that.loginInfo.level === 1 || (this.formItem.courseId !== undefined && this.formItem.courseId !== null)) {
          params = {
            courseId: that.formItem.courseId,
            pageNo: that.pageNo,
            pageSize: 10,
          }
        } else {
          params = {
            pageNo: that.pageNo,
            pageSize: 10,
          }
        }
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              that.taskList = data.data.data;
              that.total = data.data.total;
              console.log('实验课题列表', that.taskList)
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //添加实验任务
      addTask() {
        let that = this;
        let url = that.BaseConfig + '/insertExpTesk';
        that.formItem.startDate = new Date(that.formItem.startDate).getTime();
        that.formItem.endDate = new Date(that.formItem.endDate).getTime();
        let data = that.formItem;
        console.log(data)
        that
          .$http(url,'', data, 'post')
          .then(res => {
            console.log('添加实验任务', res);
            if(res.data.retCode === 0) {
              that.$Message.success('添加实验任务成功');
              that.getTaskList();
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //修改实验任务
      editTask() {
        let that = this;
        let url = that.BaseConfig + '/updateExpTesk';
        that.formItem.startDate = new Date(that.formItem.startDate).getTime();
        that.formItem.endDate = new Date(that.formItem.endDate).getTime();
        let data = that.formItem;
        that
          .$http(url,'', data, 'post')
          .then(res => {
            if(res.data.retCode === 0) {
              that.$Message.success('修改成功');
              that.getTaskList();
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
          title:'',
            content: '',
            courseId: null,
            romId: null,
            startDate: '',
            endDate: '',
            numb: null,
            fileUrl: '',
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
