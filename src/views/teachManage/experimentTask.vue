<template>
  <div>
    <div class="user-manage" style="justify-content: flex-end" v-if="loginInfo.level === 1">
      <Router-link to="./addTask">
        <Button type="primary" style="height: 33px;margin-top: 10px;">添加实验任务</Button>
      </Router-link>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginInfo: '',               //用户登录信息
        pageNo: 1, pageNo1: 1, pageNo2: 1, total: 0, current: 1,
        taskList: [],       //课程列表
        courceList: [],
        courList:[],        //此用户（教师）开设的课程列表
        romsList: [],
        roList: [],         // 空闲状态的教室列表
        startTime: '',
        endTime: '',
        formItem: {
          title:'',
          content: '',
          courseId: null,
          romId: null,
          startTime: '',
          endTime: '',
          fileUrl: '',
        },
        columns4: [
          {
            title: '实验题目',
            key: 'title'
          },
          {
            title: '内容',
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
                        path: './taskInfo',
                        query: {
                          expTeskId: params.row.id
                        }
                      });
                    }
                  }
                }, '查看'),
              ]);
            }
          },
          {
            title: '教室',
            key: 'numb',
          },
          {
            title: '开始时间',
            key: 'startTime'
          },
          {
            title: '结束时间',
            key: 'endTime'
          },
          {
            title: '实验报告',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('p', {
                  style: {
                    color: '#2d8cf0'
                  },
                  on: {
                    click: () => {
                      if(this.$store.state.loginInfo.level === 3) {
                        this.$router.push({
                          path: './addReport',
                          query: {
                            taskId: params.row.id,
                            courseId: params.row.courseId,
                            content: params.row.content,
                          }
                        })
                      } else {
                        this.$Message.warning('学生才可进行提交操作')
                      }
                    }
                  }
                }, '去提交'),
              ]);
            }
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
                    marginRight: '5px',
                    display: this.$store.state.loginInfo.level === 1? 'block': 'none',
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: './editTask',
                        query: {
                          expTeskId: params.row.id
                        }
                      });
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
                    display: this.$store.state.loginInfo.level === 3? 'block': 'none',
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: './taskInfo',
                        query: {
                          expTeskId: params.row.id
                        }
                      });
                    }
                  }
                }, '查看'),
              ]);
            }
          }
        ],
      }
    },

    created() {
      // 老师进入要先选择实验课程名称，学生进入可查看所在课程的所有实验任务
      this.loginInfo = this.$store.state.loginInfo;
      this.formItem.courseId = this.$route.query.courseId;
      if((this.formItem.courseId === undefined || this.formItem.courseId === null)&& this.loginInfo.level === 1)  {
        this.$Message.warning('请先选择课程名称');
      } else {
        this.getTaskList();
      }
      this.getCourceList();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getTaskList();
      },

      //选择课程，显示对应已有的实验任务
      choiceCource(){
        this.getTaskList();
      },

      //获取课程列表
      getCourceList() {
        let that = this;
        let url = that.BaseConfig + '/selectCourseAll';
        let params;
        if(that.loginInfo.level === 1) {
          params = {
            pageNo: that.pageNo1,
            pageSize: 10,
            teacherUserId: that.$store.state.loginInfo.userId,
          }
        } else {
          params = {
            pageNo: that.pageNo1,
            pageSize: 10,
          }
        }
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
                });
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
  .user-manage {
    display: flex;
    justify-content: space-between;
  }
</style>
