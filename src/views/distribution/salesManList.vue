<template>
  <div class="app-container">
    <div class="custom-tree-container">
      <div class="tit">
        <span style="width:154px;">推广员编号</span>
        <span>姓名</span>
        <span>手机</span>
        <span>发展人数</span>
        <span>参与活动</span>
        <span>获得分润</span>
        <span>链接</span>
        <span>操作</span>
      </div>
      <el-tree
        align="right"
        :data="data5"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :style="{ width : ((4-data.grade)*18+100)+'px' }" style="text-align:left">{{ node.label }}</span>
          <span>{{ data.name }}</span>
          <span>{{ data.phone }}</span>
          <span>{{ data.number }}</span>
          <span>{{ data.activity }}</span>
          <span>{{ data.gain }}</span>
          <span><a :href="data.url">连接</a></span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)">
              下载
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>    
  </div>
</template>



<script>
  let id = 1000

export default {
    data() {
      const data = [{
        id: 1,
        grade: 1,
        label: 'A0001',
        name: '某某某',
        phone: '15858476969',
        number: 100,
        activity: 100,
        gain: 100,
        url: '100',
        children: [{
          id: 4,
          grade: 2,
          label: 'B0001',
          name: '某某某',
          phone: '15858476969',
          number: 100,
          activity: 100,
          gain: 100,
          url: '',
          children: [{
            id: 9,
            grade: 3,
            label: 'C0001',
            name: '某某某',
            phone: '15858476969',
            number: 100,
            activity: 100,
            gain: 100,
            url: ''
          }, {
            id: 10,
            grade: 3,
            label: 'C0002',
            name: '某某某',
            phone: '15858476969',
            number: 100,
            activity: 100,
            gain: 100,
            url: ''
          }]
        }]
      }, {
        id: 2,
        grade: 1,
        label: 'A0002',
        name: '某某某',
        phone: '15858476969',
        number: 100,
        activity: 100,
        gain: 100,
        url: '',
        children: [{
          id: 5,
          grade: 2,
          label: 'B0003',
          name: '某某某',
          phone: '15858476969',
          number: 100,
          activity: 100,
          gain: 100,
          url: ''
        }, {
          id: 6,
          grade: 2,
          label: 'B0004',
          name: '某某某',
          phone: '15858476969',
          number: 100,
          activity: 100,
          gain: 100,
          url: ''
        }]
      }, {
        id: 3,
        grade: 1,
        label: 'A0003',
        name: '某某某',
        phone: '15858476969',
        number: 100,
        activity: 100,
        gain: 100,
        url: '',
        children: [{
          id: 7,
          grade: 2,
          label: 'B0005',
          name: '某某某',
          phone: '15858476969',
          number: 100,
          activity: 100,
          gain: 100,
          url: ''
        }, {
          id: 8,
          grade: 2,
          label: 'B0006',
          name: '某某某',
          phone: '15858476969',
          number: 100,
          activity: 100,
          gain: 100,
          url: ''
        }]
      }]
      return {
        data5: JSON.parse(JSON.stringify(data))
      }
    },
    filters: {

    },
    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },

      remove(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class='custom-tree-node'>
            <span>{node.label}</span>
            <span>
              <el-button size='mini' type='text' on-click={ () => this.append(data) }>Append</el-button>
              <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>)
      }
    }
  }
</script>

<style scope>
  .custom-tree-node{
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .custom-tree-node span,.tit span{
    -webkit-flex: 1;
    flex: 1;
    text-align: center
  }
  .custom-tree-node span:first-child,.tit span:first-child{
    flex:auto
  }
  .tit{
    margin-bottom: 15px;
    padding-left: 46px;
    display: flex;
    font-size: 16px;
    line-height: 38px;
    color: #666;
    background:#fafafa;
  }
</style>