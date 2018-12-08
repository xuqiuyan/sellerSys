<template>
  <div class="app-container">
    <el-table  :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;">
      <el-table-column align="center" :label="'抽奖阶段id'" >
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'次数'" >
        <template slot-scope="scope">
          <span>{{scope.row.startAt}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'价格'" >
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'成本比例'" >
        <template slot-scope="scope">
          <span>{{scope.row.costRate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="'操作'"  width="160px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleEdit(scope.row.id)">修改</el-button>          
          <el-button type="text" size="mini" @click="handleMore(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div align="center">
      <el-button type="primary"  @click="dialogVisible =true">新建抽奖阶段</el-button>      
    </div>
    <el-dialog
      title="创建新阶段"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose(dialogVisible)">
      <el-form label-width="60px" >
        <el-form-item label="次数:">
          <el-input type="number" v-model="stage.startAt" placeholder="请输入抽奖次数" :disabled="true"></el-input>
        </el-form-item> 
        <el-form-item label="价格:">
          <el-input type="number" v-model="stage.price" placeholder="请输入抽奖价格"></el-input>
        </el-form-item>      
        <el-form-item label="比例:">
          <el-input type="number" v-model="stage.costRate" placeholder="请输入成本所占比例"><el-button slot="append" >%</el-button></el-input>
        </el-form-item>             
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="CreateStage()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改阶段"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose(dialogVisible2)">
      <el-form label-width="60px" >
        <el-form-item label="次数:">
          <el-input type="number" v-model="stage.startAt" placeholder="请输入抽奖次数" :disabled="true"></el-input>
        </el-form-item> 
        <el-form-item label="价格:">
          <el-input type="number" v-model="stage.price" placeholder="请输入抽奖价格"></el-input>
        </el-form-item>      
        <el-form-item label="比例:">
          <el-input type="number" v-model="stage.costRate" placeholder="请输入成本所占比例"><el-button slot="append" >%</el-button></el-input>
        </el-form-item>             
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditStage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
// import UploadImg from '@/components/uploadFiles/UploadImg'
// import store from '@/store'
import { getStages, getStage, setStage, editStage } from '@/api/award'
export default {
  name: 'setStage',
  // components: { UploadImg },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      list: '',
      lotteryId: this.$route.query.lotteryId,
      stage: {
        id: '',
        lotteryId: '',
        startAt: 1, // 固定填1
        price: '', // 价格
        costRate: '' // {成本所占比例}
      },
      temp: {
        id: '',
        lotteryId: '',
        startAt: 1, // 固定填1
        price: '', // 价格
        costRate: '' // {成本所占比例}
      },
      listLoading: false
    }
  },
  created: function() {
    this.GetStages()
  },
  methods: {
    GetStages() {
      getStages(this.lotteryId).then(res => {
        if (res.data.data) { // 是否已配置抽奖阶段
          const temp = res.data.data
          for (let i = 0; i < temp.length; i++) {
            temp[i].costRate = this.Mul(temp[i].costRate, 100)
          }
          this.list = temp
        }
      }).catch(err => {
        console.log(err)
      })
    },
    GetStage(id) {
      getStage(this.lotteryId, id).then(res => {
        if (res.data.data) { // 是否已配置抽奖阶段
          res.data.data.costRate = this.Mul(res.data.data.costRate, 100) // 比例
          this.stage = Object.assign(res.data.data)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    CreateStage() {
      setStage(this.lotteryId, this.stage).then(res => {
        if (res.data.data) {
          this.$message.success('抽奖阶段设置成功！')
          this.dialogVisible = false
          this.stage = this.temp
          this.GetStages()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    EditStage() {
      editStage(this.lotteryId, this.stage).then(res => {
        if (res.data.data) {
          this.$message.success('抽奖阶段修改成功！')
          this.dialogVisible2 = false
          this.stage = this.temp
          this.GetStages()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    handleEdit(id) {
      this.dialogVisible2 = true
      this.GetStage(id)
    },
    Mul(arg1, arg2) {
      const r1 = arg1.toString()
      const r2 = arg2.toString()
      const d = arguments[2]
      const m = (r1.split('.')[1] ? r1.split('.')[1].length : 0) + (r2.split('.')[1] ? r2.split('.')[1].length : 0)
      const resultVal = Number(r1.replace('.', '')) * Number(r2.replace('.', '')) / Math.pow(10, m)
      return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)))
    },
    handleMore(id) {
      this.$router.push({ path: '/award/setAward', query: { lotteryId: this.lotteryId, stageId: id }})
    },
    handleClose(close) {
      close = false
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