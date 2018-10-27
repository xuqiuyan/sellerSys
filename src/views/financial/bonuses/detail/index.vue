<template>
  <div class="app-container">
      <el-form  ref="dataForm" :model="temp" label-position="left" label-width="120px" style=' margin-left:50px;' class="clearfix">
        <div class="left">
          <el-form-item :label="tableOptions[0]">
            <span>{{temp.id}}</span>
          </el-form-item>
          <el-form-item :label="tableOptions[1]">
            <span>{{temp.sellerId}}</span>
          </el-form-item>
          <el-form-item :label="tableOptions[2]">
            <span>{{temp.sellerName}}</span>      
          </el-form-item>  
          <el-form-item :label="tableOptions[3]">
            <span>{{temp.mobile}}</span> 
          </el-form-item>
          <el-form-item :label="tableOptions[4]">
            <span>{{temp.idNumber}}</span> 
          </el-form-item>
          <el-form-item :label="tableOptions[5]">
            <span>{{temp.serialNumber}}</span>          
          </el-form-item>
          <el-form-item :label="tableOptions[6]">
            <span>{{temp.cycle}}</span>
          </el-form-item>
          <el-form-item :label="tableOptions[7]">
            <span>{{temp.index}}</span>
          </el-form-item>
          <el-form-item :label="tableOptions[8]">
            <span>{{temp.percent}}</span>    
          </el-form-item>
          <el-form-item :label="tableOptions[9]">
            <span>{{temp.buyerId}}</span>    
          </el-form-item>        
          <el-form-item :label="tableOptions[10]">
            <span>{{temp.orderId}}</span>
          </el-form-item>        
        </div>
        <div class="right">          
          
          <el-form-item :label="tableOptions[11]">
            <span>{{temp.orderPrice}} 元</span>
          </el-form-item>  
          <el-form-item :label="tableOptions[12]">
            <span>{{temp.cardId | cardIdFilter}}</span>
          </el-form-item>  
          <el-form-item :label="tableOptions[13]">
            <span>{{temp.amount}} 元</span>
          </el-form-item>
          <el-form-item :label="tableOptions[14]">
            <span>{{temp.approvalStatus | statusFilter}}</span>
          </el-form-item>
          <el-form-item :label="tableOptions[15]">
            <span>{{temp.approvalMessage}}</span>
          </el-form-item>  
          <el-form-item :label="tableOptions[16]">
            <span>{{temp.approvalTime | timeFilter}}</span>
          </el-form-item>  
          <el-form-item :label="tableOptions[17]">
            <span>{{temp.auditorName}}</span>
          </el-form-item>
          <el-form-item :label="tableOptions[18]">
            <span>{{temp.paid | booleanFilter}}</span>      
          </el-form-item>
          <el-form-item :label="tableOptions[19]">
            <span>{{temp.paidTime | timeFilter}}</span>      
          </el-form-item>
          <el-form-item :label="tableOptions[20]">
            <span>{{temp.balanceHistoryId}}</span>      
          </el-form-item>  
          <el-form-item :label="tableOptions[21]">
            <span>{{temp.createTime | timeFilter}}</span>      
          </el-form-item>        
        </div>
  
        
      </el-form>
      <br>
      <div align="center" v-if="checkPermission(['cashier'])&& temp.approvalStatus === 1">
        <!-- 1：待审核 3：财务通过 两种状态下需要显示 -->
        <el-button class="filter-item" type="primary"  @click="handleAccept">通过</el-button>
        <el-button class="filter-item" type="primary"  @click="dialogFormVisible = true">拒绝</el-button>
      </div>
      <el-dialog title="请填写拒绝提现原因" :visible.sync="dialogFormVisible">
        <el-form >
          <el-form-item label="拒绝原因" >
            <el-input v-model="whyReject" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleReject">确 定</el-button>
        </div>
      </el-dialog>
  </div>

</template>

<script>
import { fetchBonusesInfo, bonusesReject, bonusesAccept } from '@/api/financial'
import { parseTime } from '@/utils'
import checkPermission from '@/utils/permission'
export default {
  data() {
    return {
      tableOptions: [
        '提成id',
        '推荐人id',
        '姓名',
        '手机号码',
        '身份证号码',
        '流水号',
        '第几周',
        '每一周第几张卡',
        '提成比例',
        '购卡人id',
        '订单id',
        '订单价格',
        '所购买的卡号',
        '提成金额',
        '审核状态',
        '审核理由',
        '审核时间',
        '审核人',
        '提现是否发放',
        '提现发放时间',
        '钱包记录id',
        '记录创建时间'
      ],
      temp: {
        id: undefined,
        sellerId: '',
        sellerName: '',
        mobile: '',
        idNumber: '',
        serialNumber: '',
        cycle: '',
        index: '',
        percent: '',
        buyerId: '',
        orderId: '',
        orderPrice: '',
        cardId: '',
        amount: '',
        approvalStatus: '',
        approvalMessage: '',
        approvalTime: '',
        auditorId: '',
        auditorName: '',
        paid: '',
        paidTime: '',
        balanceHistoryId: '',
        createTime: ''
      },
      bonusesid: this.$route.query.bonusesid,
      dialogFormVisible: false,
      whyReject: ''
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
    this.getBonusesInfo()
  },
  methods: {
    checkPermission,
    getBonusesInfo() {
      fetchBonusesInfo(this.bonusesid).then(response => {
        this.temp = Object.assign({}, response.data.data)
        this.listLoading = false
      })
    },
    handleAccept() {
      bonusesAccept(this.bonusesid).then(response => {
        this.$message({
          message: '审核通过',
          type: 'success'
        })
      })
    },
    handleReject() {
      this.dialogFormVisible = false
      bonusesReject(this.withdrawid, this.whyReject).then(response => {
        console.log(response.data)
        this.$message({
          message: '已提现拒绝',
          type: 'warning'
        })
      })
    }
  }
}
</script>

<style scoped>
.el-form-item{
  margin-bottom: 10px;
}
.left,.right{
  float: left;
  width: 50%
}
</style>

