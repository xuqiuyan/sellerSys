<template>
  <div class="app-container">
    <div class="filter-container">
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
          <span>{{scope.row.sendTime | timeFilter}}</span>
        </template>
      </el-table-column>  
      <el-table-column  align="center" :label="tableOptions[1]">
        <template slot-scope="scope">
          <span>{{scope.row.redma}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[2]" width="170px">
        <template slot-scope="scope">
          <span>{{scope.row.activityNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[3]">
        <template slot-scope="scope">
          <span>{{scope.row.money}}</span>
        </template>
      </el-table-column>  
      <el-table-column  align="center" :label="tableOptions[4]">
        <template slot-scope="scope">
          <span>{{scope.row.wechatName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[5]">
        <template slot-scope="scope">
          <span>{{scope.row.redType | redTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableOptions[6]" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handlePublish(scope.row.id)">发布</el-button>          
          <el-button type="text" size="mini" @click="handleReview(scope.row.id)">预览</el-button>
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
import { fetchRedPacketList } from '@/api/verification'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'redPacketList',
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
        '发送时间',
        '红包码',
        '活动编号',
        '金额',
        '微信号',
        '红包类型',
        '操作'],
      temp: {
        'id': '',
        'sendTime': '',
        'redma': '',
        'activityNumber': '',
        'money': '',
        'wechatName': '',
        'redType': ''
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
      value5: ''
    }
  },
  filters: {
    redTypeFilter(status) {
      const statusMap = {
        0: '随机红包',
        1: '定额红包'
      }
      return statusMap[status]
    },
    timeFilter(time) {
      return parseTime(time)
    }
  },
  created() {
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
      fetchRedPacketList(this.listQuery).then(response => {
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
    handlePublish(id) {
    },
    handleEditor(id) {
    },
    handleReview(id) {
      this.dialogReviewVisible = true
    },
    handleManage(id) {
      this.dialogQdVisible = true
      this.qdId = id
    },
    handleDelete(id) {
    },
    handleSetSalesman(id) {
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
