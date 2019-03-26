<template>
  <div>
    <div style="margin-bottom: 10px">
      课程名称：
      <Select v-model="courseId" style="width:170px" @on-change="choiceCource">
        <Option v-for="item in courList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button type="primary" style="height: 30px;margin-left: 10px" @click="isAdd = true">添加学生</Button>
    </div>
    <Table border ref="selection" :columns="columns4" :data="studentList"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: flex-end">
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
    </div>

    <!--添加学生-->
    <div v-if="level === 1">
      <Modal
        v-model="isAdd"
        title="添加课程"
        @on-ok="addStudent"
        >
        <div>

        </div>
      </Modal>
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
        courList: [],      //此教师开设的课程列表
        courseId: null,
        level: null,
        isAdd:false,     //添加学生进课程modal框
      }
    },

    created() {
      this.level = this.$store.state.loginInfo.level;
      this.courseId = this.$route.query.courseId;
      if(this.courseId === undefined || this.courseId === null) {
        this.$Message.warning('请先选择课程')
      } else {
        this.getStudentList();  //获取某课程的学生列表
      }
      this.getCourceList();    //获取此教师开设的课程列表
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
      },

      //获取某课程的学生列表
      getStudentList() {
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
              }
              that.courceList.map(item=> {
                that.courList.push({
                  value: item.id,
                  label: item.courseName
                })
              })
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //添加学生进课程
      addStudent() {

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
