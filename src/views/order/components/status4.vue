<template>
    <div>
        <el-form class="order-form"  label-width="100px" label-color="#fff"  ref="orderForm" label-position="left">
            <div v-if=" status === 4">
                <p class="title">{{status4Info}}</p>
            </div>
            <div v-else-if=" status === 6">
                <p class="title">{{status6Info}}</p>
            </div>
            <p class="title">请完善您的相关信息</p>
            <el-form-item label="姓名">
                <el-input v-model="orderForm.realName"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input v-model="orderForm.idCardNumber"></el-input>
            </el-form-item>
            <el-form-item label="身份证照片">
                <div class="imgBlock" :style="{backgroundImage: 'url(' + orderForm.idCardUrl + ')'}">
                    <upload-img :imgfoulder="'idCardUrl'" :authType="'idcard'"></upload-img>
                </div>
            </el-form-item>
            <el-form-item label="银行卡号">
                <el-input v-model="orderForm.bankCardNumber"></el-input>
            </el-form-item>
            <el-form-item label="银行卡照片">
                <div class="imgBlock" :style="{backgroundImage: 'url(' + orderForm.bankCardUrl + ')'}">
                    <upload-img :imgfoulder="'bankCardUrl'" :authType="'idcard'"></upload-img>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleSubmit">
                    提交
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import Bus from '@/api/bus'
import UploadImg from '@/components/uploadFiles/UploadImg'
import { getOrders, setPersonalInfo } from '@/api/orders'
export default {
  name: 'Status4',
  components: { UploadImg },
  data() {
    return {
      orderForm: {
        realName: '',
        idCardNumber: '',
        idCardUrl: '',
        bankCardNumber: '',
        bankCardUrl: ''
      },
      status: null,
      loading: false,
      status4Info: '请您补充以下信息',
      status6Info: '您的申请被拒绝，请重新提交您的相关信息'
    }
  },
  created() {
    Bus.$on('idCardUrl', msg => {
      // 身份证图片完成
      this.orderForm.idCardUrl = msg
    })
    Bus.$on('bankCardUrl', msg => {
      // 银行卡图片完成
      this.orderForm.bankCardUrl = msg
    })
    this.handelGetOrders()
  },
  methods: {
    handelGetOrders() {
      getOrders().then(res => {
        /** status
         * 1: 提交流水号
         * 2：交易号已提交，等待管理员审核
         * 3：流水号审核被拒绝，请再次提交流水号
         * 4：流水号审核通过，请补充身份证照片，真实姓名，银行卡号，银行卡照片
         * 5：信息已提交，等待管理员审核
         * 6：信息审核被拒绝，请再次提交身份证照片，真实姓名，银行卡号，银行卡照片
         * */
        this.status = res.data.data.status // 获取状态
      })
    },
    handleSubmit() {
      this.loading = true
      setPersonalInfo(this.orderForm.realName, this.orderForm.idCardNumber, this.orderForm.idCardUrl, this.orderForm.bankCardNumber, this.orderForm.bankCardUrl).then(res => {
        this.loading = false
        Bus.$emit('status4', res.data.code)
      })
    }
  },
  props: {
  }
}
</script>

<style  scoped>
  .order-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    background: #fff;
    border-radius: 5px
  }
 .title {
    font-weight: 400;
    color: #999;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .imgBlock{
    width:148px;
    height:148px;
    background-size:contain;
    background-repeat:no-repeat;
    background-position: center
  }
</style>
