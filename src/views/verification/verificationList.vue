<template>
  <div class="app-container">
    <div class="filter-container" align="right">
      <el-date-picker
        v-model="dateranges"
        type="daterange"
        :picker-options="pickerOptions2"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <el-input style="width:200px;" type="text" v-model="quanmaInput" placeholder="请输入券码"></el-input>
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
          <span>{{scope.row.checkMan}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[2]" width="170px">
        <template slot-scope="scope">
          <span>{{scope.row.quanma }}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[3]">
        <template slot-scope="scope">
          <span>{{scope.row.activityNumber}}</span>
        </template>
      </el-table-column>  
      <el-table-column  align="center" :label="tableOptions[4]">
        <template slot-scope="scope">
          <span>{{scope.row.activityName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[5]">
        <template slot-scope="scope">
          <span>{{scope.row.checkType | checkTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[6]">
        <template slot-scope="scope">
          <span>{{scope.row.rewardClass | rewardClassFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[7]">
        <template slot-scope="scope">
          <span>{{scope.row.rewardName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[8]">
        <template slot-scope="scope">
          <span>{{scope.row.wechatName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[9]">
        <template slot-scope="scope">
          <span>{{scope.row.tips}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableOptions[10]" class-name="small-padding fixed-width">
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
import { fetchVerificationList } from '@/api/verification'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'verificationList',
  directives: {
    waves
  },
  data() {
    return {
      quanmaInput: '',
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
        '核销时间',
        '核销员',
        '券码',
        '活动编号',
        '活动名称',
        '核销方式',
        '奖项等级',
        '奖品名称',
        '中奖者',
        '备注',
        '操作'
      ],
      temp: {
        'id': '',
        'checkTime': '',
        'checkMan': '',
        'quanma': '',
        'activityNumber': '',
        'activityName': '',
        'checkType': '',
        'rewardClass': '',
        'rewardName': '',
        'wechatName': '',
        'tips': ''
      },
      qdId: '',
      downloadLoading: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      dateranges: ''
    }
  },
  filters: {
    checkTypeFilter(status) {
      const statusMap = {
        0: '扫描',
        1: '手动输入'
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
      this.dateranges = [start, new Date()]
    },
    getList() {
      this.listLoading = true
      fetchVerificationList(this.listQuery).then(response => {
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
    handleExport() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['核销时间', '核销员', '券码', '活动编号', '活动名称', '核销方式', '奖项等级', '奖品名称', '中奖者', '备注']
        const filterVal = ['checkTime', 'checkMan', 'quanma', 'activityNumber', 'activityName', 'checkType', 'rewardClass', 'rewardName', 'wechatName', 'tips']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '核销记录'
        })
        this.downloadLoading = false
      })
    }
  }
}
</script>
