<template>
  <div>
    <div style="margin-bottom: 10px">
      <Router-link to="./addUser">
        <Button type="primary">添加用户</Button>
      </Router-link>
    </div>
    <Table border ref="selection" :columns="columns4" :data="userInfo.slice(0,10)"></Table>
    <div style="margin-top: 20px; display: flex;justify-content: space-between">
      <div>
        <Button @click="handleSelectAll(true)" type="primary">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
      </div>
      <Page :total="userInfo.length" :key="userInfo.length" show-elevator />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: [],    //用户列表,配合接口请求时，为了搭配分页使用要有两个动态参数pageNum,pageNo，条数与页数。
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户名',
            key: 'author_name',
            filters: [
              {
                label: '贺平',
                value: 1
              },
              {
                label: '江洋',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 1) {
                return row.name === '贺平';
              } else if (value === 2) {
                return row.name === '江洋';
              }
            }
          },
          {
            title: 'date',
            key: 'date'
          },
          {
            title: 'title',
            key: 'title'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
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
                      this.show(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
      }
    },

    created() {
      this.getInfo();
    },

    methods: {
      handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
      },
      getInfo() {
        let that = this;
        let url =
          that
            .$axios.JH_news('/news/index', 'type=top&key=123456')
            .then(res => {
              that.userInfo = res.articles;
            })
      },

    },
  }
</script>

<style lang="less" scoped>

</style>
