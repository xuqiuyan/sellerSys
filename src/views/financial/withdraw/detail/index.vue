<template>
  <div class="app-container">
      <el-form  ref="dataForm" :model="temp" label-position="left" label-width="120px" style=' margin-left:50px;' class="clearfix">
        <div class="left">
          <el-form-item :label="tableOptions[0]" prop="amount">
            <span>{{temp.amount}}</span>
          </el-form-item>
          <el-form-item :label="tableOptions[1]">
            <span>{{temp.paidAmount}}</span>
          </el-form-item>
          <el-form-item :label="tableOptions[2]">
            <span>{{temp.fee}}</span>      
          </el-form-item>  
          <el-form-item :label="tableOptions[3]">
            <span>{{temp.feeType}}</span> 
          </el-form-item>
          <el-form-item :label="tableOptions[4]">
            <span>{{temp.month}}</span> 
          </el-form-item>
          <el-form-item :label="tableOptions[5]">
            <span>{{temp.index}}</span>          
          </el-form-item> 
          <el-form-item :label="tableOptions[6]">
            <span>{{temp.bank}}</span>
          </el-form-item>
          <el-form-item :label="tableOptions[7]">
            <span>{{temp.cardNumber}}</span>
          </el-form-item>
          <el-form-item :label="tableOptions[8]">
            <span>{{temp.accountName}}</span>    
          </el-form-item>
          <el-form-item :label="tableOptions[9]">
            <span>{{temp.idNumber}}</span>    
          </el-form-item>        
          <el-form-item :label="tableOptions[10]">
            <span>{{temp.mobile}}</span>
          </el-form-item> 
          <el-form-item :label="tableOptions[11]">
            <span>{{temp.createTime | timeFilter}}</span>
          </el-form-item>  
          <el-form-item :label="tableOptions[12]">
            <span>{{temp.cashierApprovalStatus | statusFilter2}}</span>
          </el-form-item>   
                
        </div>
        <div class="right"> 
          <el-form-item :label="tableOptions[13]" prop="accountantId">
            <span>{{temp.cashierApprovalMessage}}</span>
          </el-form-item> 
          <el-form-item :label="tableOptions[14]" prop="accountant">
            <span>{{temp.cashierApprovalTime | timeFilter}}</span>
          </el-form-item>
          <el-form-item :label="tableOptions[15]" prop="status">
            <span>{{temp.cashierId}}</span>
          </el-form-item>  
          <el-form-item :label="tableOptions[16]" prop="number">
            <span>{{temp.cashier}}</span>
          </el-form-item>  
          <el-form-item :label="tableOptions[17]" prop="payTime">
            <span>{{temp.accountantApprovalStatus | statusFilter2}}</span>
          </el-form-item>
          <el-form-item :label="tableOptions[18]" prop="paidAmount">
            <span>{{temp.accountantApprovalMessage}}</span>      
          </el-form-item>
          <el-form-item :label="tableOptions[19]" prop="fee">
            <span>{{temp.accountantApprovalTime | timeFilter}}</span>      
          </el-form-item>
          <el-form-item :label="tableOptions[20]" prop="feeType">
            <span>{{temp.accountantId}}</span>      
          </el-form-item>  
          <el-form-item :label="tableOptions[21]" prop="month">
            <span>{{temp.accountant}}</span>      
          </el-form-item>
          <el-form-item :label="tableOptions[22]" prop="index">
            <span>{{temp.status | statusFilter}}</span>      
          </el-form-item>
          <el-form-item :label="tableOptions[23]" prop="month">
            <span>{{temp.number}}</span>      
          </el-form-item>
          <el-form-item :label="tableOptions[24]" prop="index">
            <span>{{temp.payTime | timeFilter}}</span>      
          </el-form-item>            
        </div>
  
        
      </el-form>
      <br>
      <div align="center" v-if="( checkPermission(['cashier']) && temp.status === 1) || ( checkPermission(['accountant']) && temp.status === 3)">
        <!-- 1：待审核状态 && 出纳角色 || 3：出纳已审核状态 && 财务角色   -->
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
import { fetchWithdrawInfo, withdrawAccept, withdrawReject } from '@/api/financial'
import { parseTime } from '@/utils'
import checkPermission from '@/utils/permission'
export default {
  data() {
    return {
      tableOptions: ['提现金额',
        '到账金额',
        '手续费',
        '扣费方式',
        '月份',
        '数量',
        '银行代码',
        '提现卡号',
        '姓名',
        '身份证号',
        '手机号码',
        '提现创建时间',
        '出纳审核状态',
        '出纳审核理由',
        '出纳审核时间',
        '出纳id',
        '出纳',
        '财务审核状态',
        '财务审核理由',
        '财务审核时间',
        '财务id',
        '财务',
        '审核状态',
        '打款单号',
        '打款时间'],
      temp: {
        id: undefined,
        amount: '',
        paidAmount: '',
        fee: '',
        feeType: '',
        month: '',
        index: '',
        bank: '',
        cardNumber: '',
        accountName: '',
        idNumber: '',
        mobile: '',
        createTime: '',
        cashierApprovalStatus: '',
        cashierApprovalMessage: '',
        cashierApprovalTime: '',
        cashierId: '',
        cashier: '',
        accountantApprovalStatus: '',
        accountantApprovalMessage: '',
        accountantApprovalTime: '',
        accountantId: '',
        accountant: '',
        status: '',
        number: '',
        payTime: ''
      },
      withdrawid: this.$route.query.withdrawid,
      dialogFormVisible: false,
      whyReject: ''
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
    statusFilter2(status) {
      const statusMap = {
        1: '待审核',
        2: '已拒绝',
        3: '已通过'
      }
      return statusMap[status]
    },
    timeFilter(time) {
      return parseTime(time)
    }
  },
  created() {
    this.getWithdrawInfo()
  },
  methods: {
    checkPermission,
    getWithdrawInfo() {
      fetchWithdrawInfo(this.withdrawid).then(response => {
        this.temp = Object.assign({}, response.data.data)
        this.listLoading = false
      })
    },
    handleAccept() {
      withdrawAccept(this.withdrawid).then(response => {
        this.$message({
          message: '审核通过',
          type: 'success'
        })
      })
    },
    handleReject() {
      this.dialogFormVisible = false
      withdrawReject(this.withdrawid, this.whyReject).then(response => {
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

