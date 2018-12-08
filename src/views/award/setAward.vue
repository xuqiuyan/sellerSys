<template>
  <div class="app-container">

      <el-form  ref="awards"    label-width="80px">
        <el-row  :gutter="10" justify="space-around">
          <el-col :lg="6" :md="12" v-for="(item, index) in awards" :key="item.id">
            <div class="grid-content">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>栏位{{index+1}}</span>
                  <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                </div>
                <el-form-item label="类型:">
                  <el-select v-model="item.awardType" placeholder="请选择">
                    <el-option
                      v-for="item in typeOptions"
                      :key="item.key"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <div v-if="item.awardType === 1">
                  <el-form-item label="金额区间:">
                    <el-input type="text" v-model="item.minAmount" prop="minAmount" placeholder="请输入最小金额"><el-button slot="append" >元</el-button></el-input>
                    -
                    <el-input type="text" v-model="item.maxAmount" prop="maxAmount" placeholder="请输入最大金额"><el-button slot="append" >元</el-button></el-input>
                  </el-form-item>
                </div>
                <div v-else-if="item.awardType === 4 || item.awardType === 5 ">
                  <el-form-item label="名称:">
                    <el-input type="text" v-model="item.title"  placeholder="请输入奖券或物品名称"></el-input>
                  </el-form-item>
                  <el-form-item label="价值:">
                    <el-input type="number" v-model="item.costs"  placeholder="请输入价值"><el-button slot="append" >元</el-button></el-input>
                  </el-form-item>
                </div>
                <div v-if="item.awardType === 5">
                  <el-form-item label="图片:">
                    <div class="bgHolder" :style="{backgroundImage: 'url(' + item.photoUrl + ')'}">
                      <upload-img :imgfoulder="'activityRewardUrl'+ index"  :authType="'awards'"></upload-img>
                    </div>
                  </el-form-item>
                </div>
                <el-form-item label="库存:">
                  <el-input type="number" v-model="item.stocks"  placeholder="请输入库存"><el-button slot="append" >个</el-button></el-input>
                </el-form-item>
                <!-- <el-form-item label="概率:">
                  <el-input type="text" v-model="item.chance" prop='chance' placeholder="请输入概率">
                    <el-button slot="append" >%</el-button>
                  </el-input>
                </el-form-item> -->
              </el-card>                
            </div>
          </el-col>
        </el-row>
        <br>
        <el-form-item align="center">
          <el-button type="primary" @click="onSubmit">&nbsp;&nbsp;保&nbsp;&nbsp;&nbsp;&nbsp;存&nbsp;&nbsp;</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import Bus from '@/api/bus'
import UploadImg from '@/components/uploadFiles/UploadImg'
import { getAwards, setAwards } from '@/api/award'
export default {
  name: 'setAward',
  components: { UploadImg },
  data() {
    return {
      awards: [
        { 'awardType': null, 'title': '', 'slot': '1', 'stocks': '', 'costs': '', 'photoUrl': '', 'minAmount': '', 'maxAmount': '' },
        { 'awardType': null, 'title': '', 'slot': '2', 'stocks': '', 'costs': '', 'photoUrl': '', 'minAmount': '', 'maxAmount': '' },
        { 'awardType': null, 'title': '', 'slot': '3', 'stocks': '', 'costs': '', 'photoUrl': '', 'minAmount': '', 'maxAmount': '' },
        { 'awardType': null, 'title': '', 'slot': '4', 'stocks': '', 'costs': '', 'photoUrl': '', 'minAmount': '', 'maxAmount': '' },
        { 'awardType': null, 'title': '', 'slot': '5', 'stocks': '', 'costs': '', 'photoUrl': '', 'minAmount': '', 'maxAmount': '' },
        { 'awardType': null, 'title': '', 'slot': '6', 'stocks': '', 'costs': '', 'photoUrl': '', 'minAmount': '', 'maxAmount': '' },
        { 'awardType': null, 'title': '', 'slot': '7', 'stocks': '', 'costs': '', 'photoUrl': '', 'minAmount': '', 'maxAmount': '' },
        { 'awardType': null, 'title': '', 'slot': '8', 'stocks': '', 'costs': '', 'photoUrl': '', 'minAmount': '', 'maxAmount': '' }
      ],
      typeOptions: [{
        key: 1,
        value: 1,
        label: '红包'
      }, {
        key: 4,
        value: 4,
        label: '奖券'
      }, {
        key: 5,
        value: 5,
        label: '实物'
      }],
      temp: {
        'id': '',
        'awardType': '',
        'title': '',
        'slot': '',
        'stocks': '',
        'costs': '',
        'photoUrl': '',
        'minAmount': '',
        'maxAmount': ''
      },
      urlArr: [
        { 'photoUrl': '' },
        { 'photoUrl': '' },
        { 'photoUrl': '' },
        { 'photoUrl': '' },
        { 'photoUrl': '' },
        { 'photoUrl': '' },
        { 'photoUrl': '' },
        { 'photoUrl': '' }
      ],
      lotteryId: this.$route.query.lotteryId,
      stageId: this.$route.query.stageId
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '红包',
        4: '奖券',
        5: '实物'
      }
      return statusMap[status]
    }
  },
  created: function() {
    getAwards(this.lotteryId, this.stageId).then(res => {
      if (res.data.data.length !== 0) {
        this.awards = Object.assign(res.data.data)
        this.urlArr = Object.assign(res.data.data)
      }
    }).catch(err => {
      console.log(err)
    })
    this.setPhotoUrl()
  },
  methods: {
    onSubmit() {
      setAwards(this.lotteryId, this.stageId, this.awards).then(res => {
        if (res.data.data) {
          this.$message.success('奖项设置成功！')
        } else {
          this.$message.error(res.data.message)
        }
        
      })
    },
    setPhotoUrl() {
      for (let i = 0; i < 8; i++) {
        Bus.$on('activityRewardUrl' + i, msg => {
          // 上传图片完成
          console.log('activityRewardUrl' + i,msg)
          const temp = this.awards
          temp[i].photoUrl = msg
          this.awards = temp
          // this.urlArr[i].photoUrl = msg
          // this.updateUrl()
        })
      }
    },
    updateUrl() {
      const temp = this.awards
      for (let i = 0; i < 8; i++) {
        temp[i].photoUrl = this.urlArr[i].photoUrl
      }
      this.awards = temp
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
.bgHolder{
  display: inline-block;
  background-position: center;
  background-size: contain;
  background-repeat:no-repeat;
}
</style>