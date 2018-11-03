<template>
    <div>
        <el-form class="order-form"  label-width="80px" label-color="#fff"  ref="orderForm" label-position="left">
            <div v-if=" status === '1'">
                <p class="title">{{status1Info}}</p>
            </div>
            <div v-else-if=" status === '3'">
                <p class="title">{{status3Info}}</p>
            </div>
            <p class="title">请提交交易流水号</p>
            <p class="title">收款方账号：2222222222222</p>
            <el-form-item label="上传图片">
                <div class="imgBlock" :style="{backgroundImage: 'url(' + orderForm.photoUrl + ')'}">
                    <upload-img :imgfoulder="'transactionNoUrl'" :authType="'evidence'"></upload-img>
                </div>
            </el-form-item>
            <el-form-item label="流水号">
                <el-input v-model="orderForm.transactionNo"></el-input>
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
import { getOrders, setOrders } from '@/api/orders'
export default {
  name: 'Status1',
  components: { UploadImg },
  data() {
    return {
      orderForm: {
        transactionNo: '',
        photoUrl: ''
      },
      status: null,
      loading: false,
      status1Info: '您正在申请成为加盟商/推广员',
      status3Info: '您的申请被拒绝，请重新提交流水号'
    }
  },
  created() {
    Bus.$on('transactionNoUrl', msg => {
      // 上传图片完成
      this.orderForm.photoUrl = msg
    })
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
      setOrders(this.orderId, this.orderForm.transactionNo, this.orderForm.photoUrl, this.referrerId, this.sellerId).then(res => {
        this.loading = false
        Bus.$emit('status1', res.data.code)
      })
    }
  },
  props: {
    status: '',
    orderId: '',
    referrerId: '',
    sellerId: ''
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
