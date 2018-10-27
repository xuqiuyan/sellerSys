<template>
  <div class="app-container">
    <div class="filter-container" align="right">
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.status" placeholder="审核状态">
        <el-option v-for="item in  statusOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleSearch">{{$t('table.search')}}</el-button>
            
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button> -->
      
    </div>
    <br/>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" :label="tableOptions[0]"  width="160px">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[1]">
        <template slot-scope="scope">
          <span>{{scope.row.accountName}}</span>
        </template>
      </el-table-column>  
      <el-table-column  align="center" :label="tableOptions[2]">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[3]" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.idNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[4]" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.cardNumber}}</span>
        </template>
      </el-table-column>  
      <el-table-column  align="center" :label="tableOptions[5]">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[6]">
        <template slot-scope="scope">
          <span>{{scope.row.paidAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[7]">
        <template slot-scope="scope">
          <span>{{scope.row.fee}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[8]">
        <template slot-scope="scope">
          <span>{{scope.row.month}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[9]">
        <template slot-scope="scope">
          <span>{{scope.row.index}}</span>
        </template>
      </el-table-column>
      
      <el-table-column  align="center" prop="status"  :label="tableOptions[10]">
        <template slot-scope="scope">
          <span>{{scope.row.status | statusFilter }}</span>
        </template>
      </el-table-column>     
      <el-table-column align="center" :label="tableOptions[11]" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleMore(scope.row.id)">详情</el-button>
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
import { fetchWithdrawReviewsList } from '@/api/financial'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
const statusOptions = [
  { key: '1', display_name: '待审核' },
  { key: '2', display_name: '已拒绝' },
  { key: '3', display_name: '出纳审核已通过' },
  { key: '4', display_name: '财务审核已通过' },
  { key: '5', display_name: '已打款' }
]
export default {
  name: 'FinancialReviews',
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
        status: ''
      },
      statusOptions,
      tableOptions: [
        '提现创建时间',
        '姓名',
        '手机号码',
        '身份证号',
        '卡号',
        '提现金额',
        '到账金额',
        '手续费',
        '月份',
        '数量',
        '审核状态',
        '操作'],
      temp: {
        id: undefined,
        createTime: '',
        accountName: '',
        cardNumber: '',
        amount: '',
        status: '',
        paidAmount: '',
        fee: '',
        month: '',
        index: '',
        idNumber: '',
        mobile: ''
      },
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '待审核',
        2: '已拒绝',
        3: '出纳审核已通过',
        4: '财务审核已通过',
        5: '已打款'
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
      fetchWithdrawReviewsList(this.listQuery).then(response => {
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
    handleMore(id) {
      this.$router.push({ path: '/financial/withdraw/detail', query: { withdrawid: id }})
    },
    handleSearch() {
      this.getList()
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
