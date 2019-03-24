<template>
  <div>
    <div style="margin-bottom: 10px">
      课程名称：
      <Select v-model="courseId" style="width:170px" @on-change="choiceCource">
        <Option v-for="item in courList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <Table border ref="selection" :columns="columns4" :data="studentList"></Table>
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
        studentList: [],     //学生列表
        pageNo: 1,
        pageNo1: 1,
        total: 0,
        columns4: [
          {
            title: '姓名',
            key: 'studentName',
          },
          {
            title: '课程名称',
            key: 'courseName',
          },
        ],
        courceList: [],
        courList: '',      //此教师开设的课程列表
        courseId: null,
      }
    },

    created() {
      this.getStudentList();
      this.getCourceList();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
      },
      //获取学生列表
      getStudentList() {
        let that = this;
        let url = that.BaseConfig + '/selectTeacherByStudentId';
        let params = {
          teacherUserId: that.$store.state.loginInfo.userId,
          pageNo: that.pageNo,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              that.studentList = data.data.data;
              that.total = data.data.total;
              console.log('学生列表', that.studentList)
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
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

      choiceCource() {
        let that = this;
        let url = that.BaseConfig + '/selectStudentByCourseId';
        let params = {
          courseId: that.courseId,
          pageNo: that.pageNo,
          pageSize: 10,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              that.studentList = data.data.data;
              that.total = data.data.total;
              console.log('学生列表', that.studentList)
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
