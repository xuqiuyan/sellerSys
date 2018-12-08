<template>
  <div class="app-container">
    <el-table  :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" :label="'抽奖标题'" >
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>  
      <el-table-column align="center" :label="'操作'"  width="160px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleQrcode(scope.row.id)">二维码</el-button>
          <el-button type="text" size="mini" @click="handleEdit(scope.row.title, scope.row.id)">编辑</el-button>          
          <el-button type="text" size="mini" @click="handleMore(scope.row.id)">详情</el-button>
          <!-- <router-link :to="{ path: '/award/setStage' }">详情</router-link> -->
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div align="center">
      <el-button type="primary"  @click="dialogVisible =true">创建抽奖</el-button>      
    </div>
    <el-dialog
      title="创建抽奖"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose(dialogVisible)">
      <el-form label-width="60px">
        <el-form-item label="标题:">
          <el-input type="text" v-model="title" placeholder="请输入抽奖标题"></el-input>
        </el-form-item>        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="CreateLotteries()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑抽奖"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose(dialogVisible2)">
      <el-form label-width="60px">
        <el-form-item label="标题:">
          <el-input type="text" v-model="title" placeholder="请输入抽奖标题"></el-input>
        </el-form-item>        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="EditLotteries()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="二维码"
      :visible.sync="dialogVisible3"
      width="320px"
      :before-close="handleClose(dialogVisible3)">
      <qriously :value="initQCode" :size="280"/>
    </el-dialog>
  </div>

</template>
<script>
// import { mapState } from 'vuex'
// import UploadImg from '@/components/uploadFiles/UploadImg'
// import store from '@/store'
import { getLotteries, createLotteries, editLotteries } from '@/api/award'
export default {
  name: 'setReward',
  // components: { UploadImg },
  data() {
    return {
      id: '',
      title: '',
      list: '',
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      listLoading: false,
      lotteryId: '',
      initQCode: ''
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '红包',
        4: '奖券'
      }
      return statusMap[status]
    }
  },
  created: function() {
    this.GetLotteries()
  },
  methods: {
    GetLotteries() {
      getLotteries().then(res => {
        if (res.data.data) { // 是否已配置奖项
          this.list = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    CreateLotteries() {
      this.dialogVisible = false
      createLotteries(this.title).then(res => {
        if (res.data.data) {
          this.$message.success('抽奖创建成功！')
          this.GetLotteries()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    EditLotteries() {
      this.dialogVisible2 = false
      editLotteries(this.title, this.id).then(res => {
        if (res.data.data) {
          this.$message.success('抽奖编辑成功！')
          this.GetLotteries()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    handleEdit(title, id) {
      this.title = title
      this.id = id
      this.dialogVisible2 = true
    },
    handleMore(id) {
      this.$router.push({ path: '/award/setStage', query: { lotteryId: id }})
    },
    handleClose(close) {
      close = false
    },
    handleQrcode(id) {
      this.initQCode = 'https://lottery2.dkdcm.cn/?lotteryId=' + id
      this.dialogVisible3 = true
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.box-card{
  margin:10px;
}
</style>