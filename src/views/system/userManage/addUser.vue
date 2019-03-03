<template>
    <div class="addUser">
      <p>个人信息</p>
      <div class="add-selfinfo">
        <Row>
          <Col span="8">用户名：<Input v-model="valueNum" clearable /></Col>
          <Col span="8">密码：<Input v-model="valueNum" clearable/></Col>
          <Col span="8">确认密码：<Input v-model="valueNum" clearable/></Col>
        </Row>
        <Row>
          <Col span="8">姓&nbsp;&nbsp;&nbsp;&nbsp;名：<Input v-model="valueNum" clearable /></Col>
          <!--<Col span="8">性别：<Input v-model="valueNum" clearable /></Col>-->
          <Col span="8">性别：
            <Select v-model="sex" style="width:200px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="8">联系方式：<Input v-model="valueNum" clearable /></Col>
        </Row>
        <Row>
          <Col span="8">年&nbsp;&nbsp;&nbsp;&nbsp;级：<Input v-model="valueNum" clearable /></Col>
          <Col span="8">
            <div style="display: flex; line-height: 32px;">
              专业：<Cascader :data="majorData" v-model="majorValue" style="width:200px;padding-left: 4px;"></Cascader>
            </div>
          </Col>
          <Col span="8">注册时间：<Input v-model="valueNum" clearable /></Col>
        </Row>
      </div>
      <p>我的社团</p>
      <div class="add-selfinfo">
        <Row>
          <Col span="8">社团1名称：
            <Select v-model="sex" style="width:200px">
              <Option v-for="item in assoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="8">部门名称：
            <Select v-model="sex" style="width:200px">
              <Option v-for="item in assoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="8">职务：<Input v-model="valueNum" clearable /></Col>
        </Row>
        <Row>
          <Col span="8">社团2名称：
            <Select v-model="sex" style="width:200px">
              <Option v-for="item in assoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="8">部门名称：
            <Select v-model="sex" style="width:200px">
              <Option v-for="item in assoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="8">职务：<Input v-model="valueNum" clearable /></Col>
        </Row>
        <Row>
          <Col span="8">社团3名称：
            <Select v-model="sex" style="width:200px">
              <Option v-for="item in assoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="8">部门名称：
            <Select v-model="sex" style="width:200px">
              <Option v-for="item in assoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="8">职务：<Input v-model="valueNum" clearable /></Col>
        </Row>
      </div>
      <p>用户权限</p>
      <div class="add-checked">
        <RadioGroup v-model="disabledGroup">
          <Radio label="社团管理员" ></Radio>
          <Radio label="社团成员"></Radio>
          <Radio label="普通用户"></Radio>
        </RadioGroup>
      </div>
      <div class="add-btn">
        <!--<Button style="margin-right: 20px">取消</Button>-->
        <Poptip
          confirm
          title="确认取消添加用户？"
          @on-ok="ok"
          @on-cancel="cancel">
          <Button>取消</Button>
        </Poptip>
        <Button type="primary" style="margin: 0 20px">确认</Button>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        valueNum: '',
        disabledGroup: '普通用户',
        sex: '',
        cityList: [
          {
            value: 'male',
            label: '男'
          },
          {
            value: 'female',
            label: '女'
          },
        ],
        assoList: [
          {
            value: 'qnzyz',
            label: '青年志愿者协会'
          },
          {
            value: 'jsj',
            label: '计算机协会'
          }
        ],
        majorValue: '',    //专业 v-model
        majorData: [{
          value: 'college',
          label: '信息与机电工程学院',
          children: [
            {
              value: 'jsj',
              label: '计算机科学与技术'
            },
            {
              value: 'dz',
              label: '电子信息工程'
            }
          ]
        }],     //专业级联选择框
      }
    }
  }
</script>

<style lang="less" scoped>
  .boxSize(@width, @height) {
    width: @width;
    height: @height;
  }
  .addUser {
    p {
      font-size: 16px;
      font-weight: 600;
    }
    .add-selfinfo {
      .boxSize(100%,146px);
      border: 1px solid #a2a2a2;
      margin: 5px auto 16px;
      padding: 12px;
      border-radius: 5px;
      .ivu-row {
        margin-bottom: 12px;
      }
      .ivu-input-wrapper {
        width: 200px;
      }
    }
    .add-checked {
      .boxSize(100%,43px);
      border: 1px solid #a2a2a2;
      margin: 5px auto 16px;
      padding: 12px;
      border-radius: 5px;
      .ivu-radio-group {
        font-size: 12px;
        vertical-align: middle;
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
    }
    .add-btn {
      text-align: right;
      margin-top: 20px;
    }
  }
</style>
