<template>
  <div class="app-container">
    <div class="filter-container" align="right">
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.approvalStatus" placeholder="审核状态">
        <el-option v-for="item in  statusOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleSearch">{{$t('table.search')}}</el-button>
            
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
          <span>{{scope.row.sellerName}}</span>
        </template>
      </el-table-column>  
      <el-table-column  align="center" :label="tableOptions[2]">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[3]" width="170px">
        <template slot-scope="scope">
          <span>{{scope.row.idNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[4]">
        <template slot-scope="scope">
          <span>{{scope.row.cardId | cardIdFilter}}</span>
        </template>
      </el-table-column>  
      <el-table-column  align="center" :label="tableOptions[5]">
        <template slot-scope="scope">
          <span>{{scope.row.orderId}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[6]">
        <template slot-scope="scope">
          <span>{{scope.row.orderPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[7]">
        <template slot-scope="scope">
          <span>{{scope.row.paid | booleanFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="status"  :label="tableOptions[8]">
        <template slot-scope="scope">
          <span>{{scope.row.approvalStatus | statusFilter }}</span>
        </template>
      </el-table-column>     
      <el-table-column align="center" :label="tableOptions[9]" class-name="small-padding fixed-width">
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
import { fetchBonusesList } from '@/api/financial'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
const statusOptions = [
  { key: '1', display_name: '待审核' },
  { key: '2', display_name: '已拒绝' },
  { key: '3', display_name: '已通过' }
]

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
        limit: 10,
        approvalStatus: ''
      },
      statusOptions,
      tableOptions: [
        '记录创建时间',
        '姓名',
        '手机号码',
        '身份证号',
        '卡号',
        '订单号',
        '订单金额',
        '是否发放',
        '审核状态',
        '操作'],
      temp: {
        id: undefined,
        createTime: '',
        sellerName: '',
        mobile: '',
        idNumber: '',
        cardId: '',
        orderId: '',
        orderPrice: '',
        paid: '',
        approvalStatus: ''
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
        3: '已通过'
      }
      return statusMap[status]
    },
    booleanFilter(val) {
      if (val) {
        return '是'
      } else {
        return '否'
      }
    },
    timeFilter(time) {
      return parseTime(time)
    },
    cardIdFilter(id) {
      const cardIdMap = {
        1: '月卡',
        2: '季卡',
        3: '年卡',
        4: '体验卡'
      }
      return cardIdMap[id]
    }
  },
  created() {
    this.listQuery.page = 1
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchBonusesList(this.listQuery).then(response => {
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
      this.$router.push({ path: '/financial/bonuses/detail', query: { bonusesid: id }})
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
