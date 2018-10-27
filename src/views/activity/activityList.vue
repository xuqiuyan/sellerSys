<template>
  <div class="app-container">
    <!-- <div class="filter-container" align="right">
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.approvalStatus" placeholder="审核状态">
        <el-option v-for="item in  statusOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleSearch">{{$t('table.search')}}</el-button>
            
    </div>
    <br/> -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" :label="tableOptions[0]"  width="160px">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[1]">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>  
      <el-table-column  align="center" :label="tableOptions[2]">
        <template slot-scope="scope">
          <span>{{scope.row.status | statusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[3]" width="170px">
        <template slot-scope="scope">
          <span>{{scope.row.startTime | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[4]">
        <template slot-scope="scope">
          <span>{{scope.row.endTime | timeFilter}}</span>
        </template>
      </el-table-column>  
      <el-table-column  align="center" :label="tableOptions[5]">
        <template slot-scope="scope">
          <span>{{scope.row.maxNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[6]">
        <template slot-scope="scope">
          <span>{{scope.row.tickes}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="tableOptions[7]">
        <template slot-scope="scope">
          <span>{{scope.row.balance}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="status"  :label="tableOptions[8]">
        <template slot-scope="scope">
          <span @click="openUrl(scope.row.url)">查看二维码</span>
        </template>
      </el-table-column>     
      <el-table-column align="center" :label="tableOptions[9]" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handlePublish(scope.row.id)">发布</el-button>          
          <el-button type="text" size="mini" @click="handleReview(scope.row.id)">预览</el-button>

          <el-dropdown :hide-on-click="false" :data="scope.row.id">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleManage(scope.row.id)">渠道管理</el-dropdown-item>
              <el-dropdown-item @click.native="handleEditor(scope.row.id)">编辑</el-dropdown-item>
              <el-dropdown-item @click.native="handleDelete(scope.row.id)">删除</el-dropdown-item>
              <el-dropdown-item @click.native="handleSetSalesman(scope.row.id)">配置核销员</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <br/>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


    <el-dialog title="预览" :visible.sync="dialogReviewVisible">
      <div align="center"> <img src="@/imgs/ma.jpg" alt=""></div>     
    </el-dialog>
    <el-dialog title="渠道管理" :visible.sync="dialogQdVisible">
      <template>
        <el-select v-model="value5" multiple filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <el-button type="primary" @click="handleAddQd(qdId)">添加</el-button>
      <el-button type="primary" @click="handleDownloadQd(qdId)">导出</el-button>
      <br>
      <el-table :data="qdData" border fit highlight-current-row style="width: 100%;">
        <el-table-column prop="name" label="渠道名称">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="连接">
          <template slot-scope="scope">
            <span>{{scope.row.url}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleDownload(scope.row.id)">下载</el-button>          
            <el-button type="text" size="mini" @click="handleDeleteQd(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>    
  </div>
</template>

<script>
import { fetchActivityList } from '@/api/activity'
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
        '活动编号',
        '活动名称',
        '活动状态',
        '开始时间',
        '结束时间',
        '参与人数上限',
        '剩余优惠券',
        '剩余奖金',
        '二维码链接',
        '操作'],
      temp: {
        'id': '',
        'name': '活动名称',
        'status': '',
        'startTime': '',
        'endTime': '',
        'maxNumber': '',
        'tickes': '',
        'balance': '',
        'url': ''
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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchActivityList(this.listQuery).then(response => {
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
    }
  }
}
</script>
