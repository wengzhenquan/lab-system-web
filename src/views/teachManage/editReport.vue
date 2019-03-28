<template>
    <div>
      <quill-editor
        v-model="formItem.content"
        ref="myQuillEditor"
        :options="editorOption"
      >
      </quill-editor>
      <div style="margin-top: 10px">
        附件：{{formItem.studentFileUrl}}
        <!--重新上传按钮仅学生可见-->
        <Upload
          :action="upUrl"
          :on-success="handleSuccess">
          <Button icon="ios-cloud-upload-outline">重新上传附件</Button>
        </Upload>
      </div>
      <div style="display: flex; justify-content: center">
        <!--重新提交仅学生可见-->
        <Button type="primary" style="margin-right: 20px;color: #fff" @click="editReport">重新提交</Button>
        <!--评分仅老师可见-->
        <Button type="primary" style="margin-right: 20px;color: #fff">评分</Button>
        <Poptip
          confirm
          title="返回上一级?"
          @on-ok="ok"
        >
          <Button>返回上一级</Button>
        </Poptip>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        expReportId: null,
        editorOption:{},
        upUrl: this.BaseConfig + '/fileUpload',     // 上传文件传入地址
        formItem: {
          teskId: null,
          courseId: null,
          studentUserId: this.$store.state.loginInfo.userId,
          studentFileUrl: '',
          content: '',
          updateTime: '',
        },
      }
    },

    created() {
      this.expReportId = this.$route.query.expReportId;
      this.getReportInfo();
    },

    methods: {
      //上传文件成功回调传回地址
      handleSuccess (res, file) {
        this.formItem.studentFileUrl = res.data;
      },

      //通过Id获取实验报告内容
      getReportInfo() {
        let that = this;
        let url = that.BaseConfig + '/selectExpReportById';
        let params = {
          expReportId: that.expReportId  ,
        };
        let data = null;
        that
          .$http(url, params, data, 'get')
          .then(res => {
            data = res.data;
            if(data.retCode === 0) {
              that.formItem = data.data;
              console.log(that.formItem)
            } else {
              that.$Message.error(data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      //学生重新提交实验报告
      editReport() {
        let that = this;
        let url = that.BaseConfig + '/updateExpReport';
        that.formItem.updateTime = new Date().getTime();
        let data = that.formItem;
        that
          .$http(url,'', data, 'post')
          .then(res => {
            if(res.data.retCode === 0) {
              that.$Message.success('修改成功');
              that.$router.push({
                path: './experimentReport',
                query: {
                  // courseId: that.formItem.courseId,
                }
              })
            } else {
              that.$Message.error(res.data.retMsg);
            }
          })
          .catch(err => {
            that.$Message.error('请求错误');
          })
      },

      ok() {},

    }
  }
</script>

<style scoped>
  /deep/ .ql-toolbar.ql-snow + .ql-container.ql-snow {
    height: 480px;
    overflow-y: scroll;
  }
  .ivu-btn {
    border-color: #2d8cf0;
    color: #2d8cf0;
  }
</style>
