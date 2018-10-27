<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="tableOptions[0]" v-model="listQuery.name">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
            
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
      
    </div> -->
    <br/>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" :label="tableOptions[0]" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | timeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[1]">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"  :label="tableOptions[2]">
        <template slot-scope="scope">
          <span>{{scope.row.realname}}</span> 
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[3]">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[4]">
        <template slot-scope="scope">
          <span>{{scope.row.idNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"  :label="tableOptions[5]">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span> 
        </template>
      </el-table-column>   
      <el-table-column  align="center" :label="tableOptions[6]">
        <template slot-scope="scope">
          <span>{{scope.row.status | statusFilter }}</span>
        </template>
      </el-table-column>     
    </el-table>
    <br/>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"> </el-table-column>
        <el-table-column prop="pv" label="Pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchRechargesList } from '@/api/financial'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'financial',
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
        limit: 10
      },
      tableOptions: ['下单时间', '单号', '姓名', '手机号码', '身份证号', '金额', '状态', '操作'],
      temp: {
        id: undefined,
        createTime: '',
        realname: '',
        mobile: '',
        idNumber: '',
        amount: '',
        status: ''
      },
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '待充值',
        2: '已关闭',
        3: '已经充值'
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
    getList() {
      this.listLoading = true
      fetchRechargesList(this.listQuery).then(response => {
        this.list = response.data.data
        this.listLoading = false
        this.total = response.data.totalCount
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['名称', '地址', '所在区域', '店长', '简介', '操房数量', '总面积', '私教面积', '店铺封面', '店铺照片', '开店时间']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '店铺列表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
