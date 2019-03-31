<template>
  <div>
    <div class="user-manage">
      <div style="width: 40%;margin-bottom: 10px">
        课程名称：
        <Select v-model="courseId" style="width:170px" @on-change="choiceAchieveList">
          <Option v-for="item in courList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <Table border ref="selection" :columns="columns" :data="achieveList" v-if="level === 1"></Table>
    <Table border ref="selection" :columns="columnsS" :data="achieveList" v-if="level === 3"></Table>
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
        pageNo: 1,pageNo1: 1,
        total: 0,
        level: null,
        achieveList: [],   //学生成绩列表
        courceList: [],
        courList:[],        //此用户（教师）开设的课程列表
        columnsS: [
          {
            title: '课程名',
            key: 'courseName'
          },
          {
            title: '课任老师',
            key: 'teacherName',
          },
          {
            title: '总学分',
            key: 'totalScore'
          },
          {
            title: '得分',
            key: 'achieve'
          },
        ],
        columns: [
          {
            title: '课程名',
            key: 'courseName'
          },
          {
            title: '学生',
            key: 'studentName',
          },
          {
            title: '总学分',
            key: 'totalScore'
          },
          {
            title: '得分',
            key: 'achieve'
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
                  },
                  on: {
                    click: () => {
                      console.log(params.row)
                      // this.$router.push({
                      //   path: './editReport',
                      //   query: {
                      //     expReportId: params.row.id,
                      //   }
                      // })
                    }
                  }
                }, '修改成绩'),
              ]);
            }
          }
        ],
        courseId: null,
      }
    },

    created() {
      this.level = this.$store.state.loginInfo.level;
      if(this.level === 3) {
        this.getAchieveList();
      }
      this.getCourceList();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        if(this.level === 1) {
          this.choiceAchieveList();
        } else {
          this.getAchieveList();
        }
      },

      //学生查看成绩
      getAchieveList() {
        let that = this;
        let url = that.BaseConfig + '/selectAchieveAllByStudentId';
        let params = {
          pageNo: that.pageNo,
          pageSize: 10,
          studentId: that.$store.state.loginInfo.userId,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              that.achieveList = data.data.data;
              that.total = data.data.total;
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //教师查看学生成绩
      choiceAchieveList() {
        let that = this;
        let url = that.BaseConfig + '/selectAchieveAllByTeacherId';
        let params = {
          pageNo: that.pageNo,
          pageSize: 10,
          courseId: that.courseId,
          teacherUserId: that.$store.state.loginInfo.userId,
        };
        console.log(params)
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              that.achieveList = data.data.data;
              that.total = data.data.total;
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //获取此教师开设的课程列表
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
    }
  }
</script>

<style lang="less" scoped>
  .user-manage {
    display: flex;
    justify-content: space-between;
  }
</style>
