<template>
  <div>
    <div class="user-manage">
      <Button type="primary" style="height: 33px;margin-top: 10px;" @click="isAdd = true">添加实验课题</Button>
      <div style="display: flex; justify-content: flex-end;margin-top: 10px;margin-bottom: 10px">
        <Select v-model="sortValue" style="width:150px">
          <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div style="width: 270px;margin-left: 3px"><Input search enter-button="搜索" placeholder="输入要查找的内容" v-model="name" /></div>
      </div>
    </div>
    <Table border ref="selection" :columns="columns4" :data="taskList"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: flex-end">
      <Page :total="total" :key="total" :current.sync="current" @on-change="pageChange" />
    </div>

    <!--添加课程-->
    <!--实验室、课程必须是已经存在的-->
    <Modal
      v-model="isAdd"
      title="添加实验课程"
      @on-ok="addCource"
      @on-cancel="cancel">
      <div>
        <Form :model="formItem" :label-width="80">
          <FormItem label="实验题目：">
            <Input v-model="formItem.title"></Input>
          </FormItem>
          <FormItem label="实验内容：">
            <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 4,maxRows: 5}"></Input>
          </FormItem>
          <FormItem label="课程名称：">
            <Input v-model="formItem.courseName"></Input>
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
        taskList: [],     //课程列表
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
            title: '实验题目',
            key: 'title'
          },
          {
            title: '实验内容',
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
                }, '查看'),
              ]);
            }
          },
          {
            title: '实验教室',
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
                      this.isEditUser = true;
                      this.formValidate.id = params.row.userId;
                      this.formValidate.userName = params.row.userName;
                      this.formValidate.name = params.row.name;
                      this.formValidate.job = params.row.job;
                      this.formValidate.identityId = params.row.identityId;
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.deleteUser(params.row.userId);
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        isAdd: false,
        formItem: {
          title:'',
          content: '',
          courseId: null,
          romId: null,
          startDate: '',
          endDate: '',
          numb: null,
          fileUrl: '',
        }
      }
    },

    created() {
      this.getTaskList();
    },

    methods: {
      //改变页数
      pageChange(val) {
        this.pageNo = val;
        this.getInfo();
      },
      //获取实验任务列表
      getTaskList() {
        let that = this;
        let url = that.BaseConfig + '/selectExpTeskAll';
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
      //添加课题
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
