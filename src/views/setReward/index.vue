<template>
  <div class="app-container">
    <el-tabs type="border-card"  v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="活动设置" name="activitySet">
        <el-form ref="form1" :model="form1" label-width="120px">
          <el-form-item label="活动主题图">
            <upload-img :imgfoulder="'activityThemeUrl'"></upload-img>
          </el-form-item>
          <el-form-item label="背景图">
            <upload-img :imgfoulder="'activityBgUrl'"></upload-img>
          </el-form-item>
          <el-form-item label="抽奖模式">
            <el-radio-group v-model="form1.type">
              <el-radio label="直抽模式"></el-radio>
              <el-radio label="奖池模式"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="直抽模式" name="model1">
        <el-form ref="form2"  label-width="80px">
          <el-row  :gutter="10" justify="space-around">
            <el-col :lg="6" :md="12" v-for="(item, index) in form2" :key="item.id">
              <div class="grid-content">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>栏位{{index+1}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                  </div>
                  <el-form-item label="图片:">
                    <upload-img :imgfoulder="'activityRewardUrl'+ index"></upload-img>
                  </el-form-item>
                  <el-form-item label="类型:">
                    <el-select v-model="item.type" placeholder="请选择">
                      <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <div v-if=" item.type === '0' ">
                    <el-form-item label="金额:">
                      <el-input type="text" v-model="item.money"   placeholder="请输入金额"><el-button slot="append" >元</el-button></el-input>
                    </el-form-item>                    
                  </div>
                  <div v-else-if="item.type === '1'"> 
                    <el-form-item label="金额区间:">
                      <el-input type="text" v-model="item.minMoney" placeholder="请输入金额"><el-button slot="append" >元</el-button></el-input>
                      -
                      <el-input type="text" v-model="item.maxMoney" placeholder="请输入金额"><el-button slot="append" >元</el-button></el-input>
                    </el-form-item>                    
                  </div>
                  <div v-else-if="item.type === '2'">
                    <el-form-item label="奖品名称:">
                      <el-input type="text" v-model="item.rewardName" placeholder="请输入奖品名称"></el-input>
                    </el-form-item>
                  </div>
                  <div v-else-if="item.type === '3'">
                    <el-form-item label="卡券:">
                      <el-select v-model="item.quanType" placeholder="请选择">
                        <el-option
                          v-for="item in quanOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="券名:">
                      <el-input type="text" v-model="item.quanName" placeholder="请输入券名"></el-input>
                    </el-form-item>
                    <el-form-item label="有效时间:">
                      <el-date-picker type="date" v-model="item.startTime" placeholder="开始时间" style="width: 100%;"></el-date-picker>
                      -
                      <el-time-picker type="date" v-model="item.endTime" placeholder="结束时间"  style="width: 100%;"></el-time-picker>
                    </el-form-item>
                  </div>
                  <div v-if="isModel1">
                    <el-form-item label="库存:">
                      <el-input type="text" v-model="item.stock" placeholder="请输入库存"><el-button slot="append" >个</el-button></el-input>
                    </el-form-item>
                    <el-form-item label="概率:">
                      <el-input type="text" v-model="item.chance" placeholder="请输入概率">
                        <el-button slot="append" >%</el-button>
                      </el-input>
                    </el-form-item>
                  </div>
                  <div v-else>
                    <el-form-item label="物品价值:">
                      <el-input type="text" v-model="item.worth" placeholder="请输入物品价值"></el-input>
                    </el-form-item>
                  </div>
                </el-card>                
              </div>
              </el-col>
          </el-row>
          <br>
          <el-form-item align="center">
            <el-button type="primary" @click="onSubmit">&nbsp;&nbsp;保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存&nbsp;&nbsp;</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="奖池模式" name="model2">
        
      </el-tab-pane>
    </el-tabs>    

  </div>
</template>
<script>
import { mapState } from 'vuex'
import UploadImg from '@/components/uploadFiles/UploadImg'
// import store from '@/store'
export default {
  name: 'setReward',
  components: { UploadImg },
  data() {
    return {
      activeName: 'activitySet',
      isModel1: true,
      form1: {
        activityThemeUrl: '',
        activityBgUrl: '',
        type: '0'
      },
      rewardUrl1: '',
      form2: [
        { 'id': '0', 'type': '1', 'rewardUrl': '', 'stock': '100', 'chance': '10', 'money': '', 'minMoney': '', 'maxMoney': '', 'rewardName': '', 'quanType': '', 'quanName': '', 'startTime': '', 'endTime': '', 'worth': '' },
        { 'id': '1', 'type': '1', 'rewardUrl': '', 'stock': '100', 'chance': '10', 'money': '', 'minMoney': '', 'maxMoney': '', 'rewardName': '', 'quanType': '', 'quanName': '', 'startTime': '', 'endTime': '', 'worth': '' },
        { 'id': '2', 'type': '1', 'rewardUrl': '', 'stock': '100', 'chance': '10', 'money': '', 'minMoney': '', 'maxMoney': '', 'rewardName': '', 'quanType': '', 'quanName': '', 'startTime': '', 'endTime': '', 'worth': '' },
        { 'id': '3', 'type': '1', 'rewardUrl': '', 'stock': '100', 'chance': '10', 'money': '', 'minMoney': '', 'maxMoney': '', 'rewardName': '', 'quanType': '', 'quanName': '', 'startTime': '', 'endTime': '', 'worth': '' },
        { 'id': '4', 'type': '1', 'rewardUrl': '', 'stock': '100', 'chance': '10', 'money': '', 'minMoney': '', 'maxMoney': '', 'rewardName': '', 'quanType': '', 'quanName': '', 'startTime': '', 'endTime': '', 'worth': '' },
        { 'id': '5', 'type': '1', 'rewardUrl': '', 'stock': '100', 'chance': '10', 'money': '', 'minMoney': '', 'maxMoney': '', 'rewardName': '', 'quanType': '', 'quanName': '', 'startTime': '', 'endTime': '', 'worth': '' },
        { 'id': '6', 'type': '1', 'rewardUrl': '', 'stock': '100', 'chance': '10', 'money': '', 'minMoney': '', 'maxMoney': '', 'rewardName': '', 'quanType': '', 'quanName': '', 'startTime': '', 'endTime': '', 'worth': '' },
        { 'id': '7', 'type': '1', 'rewardUrl': '', 'stock': '100', 'chance': '10', 'money': '', 'minMoney': '', 'maxMoney': '', 'rewardName': '', 'quanType': '', 'quanName': '', 'startTime': '', 'endTime': '', 'worth': '' },
        { 'id': '8', 'type': '1', 'rewardUrl': '', 'stock': '100', 'chance': '10', 'money': '', 'minMoney': '', 'maxMoney': '', 'rewardName': '', 'quanType': '', 'quanName': '', 'startTime': '', 'endTime': '', 'worth': '' },
        { 'id': '9', 'type': '1', 'rewardUrl': '', 'stock': '100', 'chance': '10', 'money': '', 'minMoney': '', 'maxMoney': '', 'rewardName': '', 'quanType': '', 'quanName': '', 'startTime': '', 'endTime': '', 'worth': '' },
        { 'id': '10', 'type': '1', 'rewardUrl': '', 'stock': '100', 'chance': '10', 'money': '', 'minMoney': '', 'maxMoney': '', 'rewardName': '', 'quanType': '', 'quanName': '', 'startTime': '', 'endTime': '', 'worth': '' },
        { 'id': '11', 'type': '1', 'rewardUrl': '', 'stock': '100', 'chance': '10', 'money': '', 'minMoney': '', 'maxMoney': '', 'rewardName': '', 'quanType': '', 'quanName': '', 'startTime': '', 'endTime': '', 'worth': '' }
      ],
      options: {
        Bucket: 'static-1257000451',
        Region: 'ap-shanghai'
      },
      typeOptions: [{
        value: '0',
        label: '定额红包'
      }, {
        value: '1',
        label: '随机红包'
      }, {
        value: '2',
        label: '实物商品'
      }, {
        value: '3',
        label: '卡券'
      }],
      quanOptions: [{
        value: '0',
        label: '代金券'
      }, {
        value: '1',
        label: '兑换券'
      }],
      temp: {
        'id': '',
        'type': '',
        'rewardUrl': '',
        'stock': '',
        'chance': '',
        'money': '',
        'minMoney': '',
        'maxMoney': '',
        'rewardName': '',
        'quanType': '',
        'quanName': '',
        'startTime': '',
        'endTime': '',
        'worth': ''
      }
    }
  },
  computed: {
    ...mapState({
      activityUrl: state => state.activity.activityUrl
    })
  },
  created: function() {
    var i = 0
    const arrTemp = this.form2
    for (const k in this.activityUrl) {
      if (i === 0) {
        this.form1.activityThemeUrl = this.activityUrl[k]
      } else if (i === 1) {
        this.form1.activityBgUrl = this.activityUrl[k]
      } else if (i === 2) {
        arrTemp[i - 2].rewardUrl = this.activityUrl[k]
      }
      i++
    }
    this.form2 = arrTemp
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    handleTabClick: function(tab, event) {
      const id = event.target.getAttribute('id')
      if (id === 'tab-activitySet') {
        console.log('activitySet')
      } else if (id === 'tab-model1') {
        console.log('model1')
      } else if (id === 'tab-model2') {
        console.log('model2')
      }
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