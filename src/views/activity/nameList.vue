<template>
  <div class="app-container">
    <el-tabs type="border-card"  v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="中奖名单" name="rewardlist">
        <el-table :key='tableKey' :data="rewardlist" v-loading="listLoading" border fit highlight-current-row
          style="width: 100%;">
          <el-table-column align="center" :label="tableOptions[0]"  width="160px">
            <template slot-scope="scope">
              <img :src="scope.row.wechatUrl" alt="">
            </template>
          </el-table-column>
          <el-table-column  align="center" :label="tableOptions[1]">
            <template slot-scope="scope">
              <span>{{scope.row.wechatName}}</span>
            </template>
          </el-table-column>  
          <el-table-column  align="center" :label="tableOptions[2]">
            <template slot-scope="scope">
              <span>{{scope.row.realName}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center" :label="tableOptions[3]" width="170px">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center" :label="tableOptions[4]">
            <template slot-scope="scope">
              <span>{{scope.row.rewardType}}</span>
            </template>
          </el-table-column>  
          <el-table-column  align="center" :label="tableOptions[5]">
            <template slot-scope="scope">
              <span>{{scope.row.rewardName}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center" :label="tableOptions[6]">
            <template slot-scope="scope">
              <span>{{scope.row.rewardTime | timeFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center" :label="tableOptions[7]">
            <template slot-scope="scope">
              <span>{{scope.row.status | statusFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center" :label="tableOptions[8]">
            <template slot-scope="scope">
              <span>{{scope.row.salesMan}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center" :label="tableOptions[9]">
            <template slot-scope="scope">
              <span>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" :label="tableOptions[10]" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handlePublish(scope.row.id)">发布</el-button>  
            </template>
          </el-table-column> -->
        </el-table>
        <br/>
        <div class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户排名" name="rankinglist">
        <el-table :key='tableKey' :data="rankinglist" v-loading="listLoading" border fit highlight-current-row
          style="width: 100%;">
          <el-table-column align="center" :label="rankingOptions[0]"  width="160px">
            <template slot-scope="scope">
              <img :src="scope.row.ranking" alt="">
            </template>
          </el-table-column>
          <el-table-column  align="center" :label="rankingOptions[1]">
            <template slot-scope="scope">
              <span>{{scope.row.wechatUrl}}</span>
            </template>
          </el-table-column>  
          <el-table-column  align="center" :label="rankingOptions[2]">
            <template slot-scope="scope">
              <span>{{scope.row.wechatName}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center" :label="rankingOptions[3]" width="170px">
            <template slot-scope="scope">
              <span>{{scope.row.bestReward}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center" :label="rankingOptions[4]">
            <template slot-scope="scope">
              <span>{{scope.row.rewardType}}</span>
            </template>
          </el-table-column>  
          <el-table-column  align="center" :label="rankingOptions[5]">
            <template slot-scope="scope">
              <span>{{scope.row.firstTime | timeFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column  align="center" :label="rankingOptions[6]">
            <template slot-scope="scope">
              <span>{{scope.row.salesMan }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="tableOptions[10]" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleScore(scope.row.id)">修改成绩</el-button>          
              <el-button type="text" size="mini" @click="handleReviewType(scope.row.id)">修改奖项</el-button>
              <el-button type="text" size="mini" @click="handleBlackList(scope.row.id)">移入黑名单</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br/>
        <div class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="黑名单">黑名单</el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { fetchRewardList, fetchRankingList } from '@/api/activity'
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
      activeName: 'rewardlist',
      rewardlist: null,
      rankinglist: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        approvalStatus: ''
      },
      statusOptions,
      tableOptions: [
        '微信头像',
        '微信名称',
        '姓名',
        '手机号',
        '奖项',
        '奖品',
        '中奖时间',
        '领奖状态',
        '渠道人员',
        '收货地址',
        '操作'],
      temp: {
        'wechatUrl': '',
        'wechatName': '',
        'realName': '',
        'phone': '',
        'rewardType': '',
        'rewardName': '',
        'rewardTime': '',
        'status': '',
        'salesMan': '',
        'address': ''
      },
      rankingOptions: [
        '排名',
        '微信头像',
        '微信名称',
        '最佳成绩',
        '奖项',
        '首次参与时间',
        '渠道',
        '操作'
      ],
      rankingTemp: {
        'ranking': '',
        'wechatUrl': '',
        'wechatName': '',
        'bestReward': '',
        'rewardType': '',
        'firstTime': '',
        'salesMan': ''
      },
      dialogReviewVisible: false,
      dialogQdVisible: false,
      qdId: '',
      qdData: [{ 'name': '渠道1', 'url': 'http://' }, { 'name': '渠道2', 'url': 'http://' }],
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
      value5: []
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '全部状态',
        1: '未发布',
        2: '自动开始',
        3: '进行中',
        4: '已结束',
        5: '违规关闭'
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
    }
  },
  created() {
    this.listQuery.page = 1
    this.getRewardList()
  },
  methods: {
    handleTabClick: function(tab, event) {
      const id = event.target.getAttribute('id')
      if (id === 'tab-rewardlist') {
        this.getRewardList()
      } else if (id === 'tab-rankinglist') {
        this.getRankingList()
      }
    },
    getRewardList() {
      this.listLoading = true
      fetchRewardList(this.listQuery).then(response => {
        this.rewardlist = response.data.data
        this.listLoading = false
        this.total = response.data.totalCount
      })
    },
    getRankingList() {
      console.log('getRankingList')
      this.listLoading = true
      fetchRankingList(this.listQuery).then(response => {
        this.rankinglist = response.data.data
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
    handleManage(id) {
      this.dialogQdVisible = true
      this.qdId = id
    },
    handleDelete(id) {
    },
    handleSetSalesman(id) {
    },
    handleScore(id) {
    },
    handleReviewType(id) {
    },
    handleBlackList(id) {
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
