<template>
  <div class="app-container">
    <div class="filter-container" align="right">
      <el-date-picker
        v-model="value5"
        type="daterange"
        :picker-options="pickerOptions2"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleSearch">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" type="primary" v-waves  @click="handleExport">导出</el-button>      
    </div>
    <br/> 
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;">
      <el-table-column  align="center" :label="tableOptions[0]">
        <template slot-scope="scope">
          <span>{{scope.row.checkTime | timeFilter}}</span>
        </template>
      </el-table-column>  
      <el-table-column  align="center" :label="tableOptions[1]">
        <template slot-scope="scope">
          <span>{{scope.row.checkMa}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[2]" width="170px">
        <template slot-scope="scope">
          <span>{{scope.row.activityNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[3]">
        <template slot-scope="scope">
          <span>{{scope.row.rewardClass | rewardClassFilter}}</span>
        </template>
      </el-table-column>  
      <el-table-column  align="center" :label="tableOptions[4]">
        <template slot-scope="scope">
          <span>{{scope.row.rewardName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[5]">
        <template slot-scope="scope">
          <span>{{scope.row.wechatName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[6]">
        <template slot-scope="scope">
          <span>{{scope.row.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[7]">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[8]">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[9]">
        <template slot-scope="scope">
          <span>{{scope.row.status | statusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[10]">
        <template slot-scope="scope">
          <span>{{scope.row.intro}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableOptions[11]" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br/>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { fetchGiftsList } from '@/api/verification'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'giftsList',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        approvalStatus: ''
      },
      tableOptions: [
        '兑奖时间',
        '兑奖码',
        '活动编号',
        '奖项等级',
        '奖品名称',
        '微信号',
        '真实姓名',
        '手机号',
        '收货地址',
        '兑奖状态',
        '说明',
        '操作'
      ],
      temp: {
        'id': '',
        'checkTime': '',
        'checkMa': '',
        'activityNumber': '',
        'rewardClass': '',
        'rewardName': '',
        'wechatName': '',
        'realName': '',
        'phone': '',
        'address': '',
        'status': '',
        'intro': '说明'
      },
      downloadLoading: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }]
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '正在充值',
        1: '成功充值',
        2: '充值失败',
        3: '正在派发',
        4: '成功派发',
        5: '派发失败'
      }
      return statusMap[status]
    },
    rewardClassFilter(status) {
      const statusMap = {
        0: '一等奖',
        1: '二等奖',
        2: '三等奖'
      }
      return statusMap[status]
    },
    timeFilter(time) {
      return parseTime(time)
    }
  },
  created() {
    this.setTimeRange()
    this.listQuery.page = 1
    this.getList()
  },
  methods: {
    setTimeRange() {
      // set time range
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.value5 = [start, new Date()]
    },
    getList() {
      this.listLoading = true
      fetchGiftsList(this.listQuery).then(response => {
        this.list = response.data.data
        this.listLoading = false
        this.total = response.data.totalCount
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleSearch() {
      this.getList()
    },
    handleDelete(id) {
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleExport() {}
  }
}
</script>
