<template>
  <div class="app-container">
    
    <br/>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" :label="tableOptions[0]"  width="160px">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[1]">
        <template slot-scope="scope">
          <span>{{scope.row.realName}}</span>
        </template>
      </el-table-column>  
      <el-table-column  align="center" :label="tableOptions[2]">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[3]" width="170px">
        <template slot-scope="scope">
          <span>{{scope.row.roles | rolesFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[4]">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | timeFilter}}</span>
        </template>
      </el-table-column>    
    </el-table>
    <br/>


  </div>
</template>

<script>
import { fetchAccountList } from '@/api/account'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'AdminList',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      tableOptions: [
        'id',
        '姓名',
        '手机号码',
        '角色',
        '创建时间'],
      temp: {
        id: undefined,
        createTime: '',
        mobile: '',
        realName: '',
        roles: []
      }
    }
  },
  filters: {
    rolesFilter(roles) {
      const rolesMap = {
        'admin': '管理员',
        'accountant': '财务',
        'cashier': '出纳'
      }
      var rolesString = ''
      for (let i = roles.length - 1; i >= 0; i--) {
        rolesString += rolesMap[roles[i]]
        if (i !== 0) {
          rolesString += '  '
        }
      }
      return rolesString
    },
    timeFilter(time) {
      return parseTime(time)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchAccountList().then(response => {
        this.list = response.data.data
        this.listLoading = false
        this.total = response.data.totalCount
      })
    }
  }
}
</script>
