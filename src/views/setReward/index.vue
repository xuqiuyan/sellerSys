<template>
  <div class="app-container">

      <el-form  ref="awards"    label-width="80px">
        <el-form-item label="活动名称:">
          <el-input type="text" v-model="title" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-row  :gutter="10" justify="space-around">
          <el-col :lg="6" :md="12" v-for="(item, index) in awards" :key="item.id">
            <div class="grid-content">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>栏位{{index+1}}</span>
                  <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                </div>
                <!-- <el-form-item label="图片:">
                  <upload-img :imgfoulder="'activityRewardUrl'+ index"></upload-img>
                </el-form-item> -->
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
                <div v-if="item.awardType === 4">
                  <el-form-item label="奖券名称:">
                    <el-input type="text" v-model="item.title"  placeholder="请输入奖券名称"></el-input>
                  </el-form-item>
                  <el-form-item label="库存:">
                    <el-input type="number" v-model="item.stocks"  placeholder="请输入库存"><el-button slot="append" >个</el-button></el-input>
                  </el-form-item>
                </div>
                
                  
                  <!-- <el-form-item label="概率:">
                    <el-input type="text" v-model="item.chance" prop='chance' placeholder="请输入概率">
                      <el-button slot="append" >%</el-button>
                    </el-input>
                  </el-form-item> -->
                  <!-- <el-form-item label="物品价值:">
                    <el-input type="text" v-model="item.worth" prop='worth' placeholder="请输入物品价值"></el-input>
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
// import { mapState } from 'vuex'
// import UploadImg from '@/components/uploadFiles/UploadImg'
// import store from '@/store'
import { getLotteries, getAwards, setAwards } from '@/api/setReward'
export default {
  name: 'setReward',
  // components: { UploadImg },
  data() {
    return {
      title: '',
      awards: [
        { 'awardType': null, 'title': '', 'slot': '1', 'stocks': '' },
        { 'awardType': null, 'title': '', 'slot': '2', 'stocks': '' },
        { 'awardType': null, 'title': '', 'slot': '3', 'stocks': '' },
        { 'awardType': null, 'title': '', 'slot': '4', 'stocks': '' },
        { 'awardType': null, 'title': '', 'slot': '5', 'stocks': '' },
        { 'awardType': null, 'title': '', 'slot': '6', 'stocks': '' },
        { 'awardType': null, 'title': '', 'slot': '7', 'stocks': '' },
        { 'awardType': null, 'title': '', 'slot': '8', 'stocks': '' }
      ],
      typeOptions: [{
        key: 1,
        value: 1,
        label: '红包'
      }, {
        key: 4,
        value: 4,
        label: '奖券'
      }],
      temp: {
        'id': '',
        'awardType': '',
        'title': '',
        'slot': '',
        'stocks': ''
      }
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
    getLotteries().then(res => {
      if (res.data.data) { // 是否已配置奖项
        const id = res.data.data.id
        this.title = res.data.data.title
        getAwards(id).then(res => {
          this.awards = Object.assign(res.data.data)
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    onSubmit() {
      setAwards(this.title, this.awards).then(res => {
        this.$message.success('奖项设置成功！')
      })
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