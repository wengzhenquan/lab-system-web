<template>
  <div>
    <div class="user-manage" style="justify-content: flex-end" >
      <Button type="primary" style="height: 33px;margin-top: 10px;" @click="isAdd = true">添加实验报告</Button>
    </div>
    <div style="display:flex;margin-bottom: 8px;margin-top: 8px">
      <div style="width: 40%">
        课程名称：
        <Select v-model="formItem.courseId" style="width:170px">
          <Option v-for="item in courList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        实验课题：
        <Select v-model="formItem.courseId" style="width:170px">
          <Option v-for="item in courList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
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
        courceList: [],
        courList: [],    //课程列表
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

                    }
                  }
                }, '编辑'),
              ]);
            }
          }
        ],
        isAdd: false,
        formItem: {
          courseName: '',
          totalScore: null,
          startDate: '',
          endDate: '',
          teacherUserId: this.$store.state.loginInfo.userId,
        },
      }
    },

    created() {
      this.getCourceList();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
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

      //添加课程
      addCource() {
        let that = this;
        let url = that.BaseConfig + '/insertCourse';
        let data = that.formItem;
        that
          .$http(url,'', data, 'post')
          .then(res => {
            console.log('创建课程', res);
            if(data.retCode === 0) {

            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //取消
      cancel() {
        console.log(new Date())
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
