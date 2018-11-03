<template>
  <div class="order-container">
    <div v-if="status === 0">
      <el-form class="order-form status0" autoComplete="on" :model="orderForm" :rules="orderRules" ref="orderForm" label-position="left">
        <h3 class="title">请选择您加入我们的方式</h3>
        <el-form-item>
          <span class="svg-container svg-container_order">
            <svg-icon icon-class="user" />
          </span>
          <el-input name="referrerId" type="text" v-model="orderForm.referrerId" autoComplete="on" placeholder="请输入推荐人手机号" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="orderForm.sellerType" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleCreateOrder">
            加入
          </el-button>
        </el-form-item>
      </el-form>      
    </div>
    <div v-else-if="status === 1">
      <!-- 提交流水号 -->
      <status1 :orderId="orderId" :referrerId="referrerId" :sellerId="sellerId"  :status="'1'"></status1>
    </div>
    <div v-else-if="status === 2">
      <!-- 交易号已提交，等待管理员审核 -->
      <p>流水号提交成功，等待管理员审核</p>
    </div>
    <div v-else-if="status === 3">
      <!-- 流水号审核被拒绝，请再次提交流水号 -->
      <status1 :orderId="orderId" :referrerId="referrerId" :sellerId="sellerId" :status="'3'" ></status1>
    </div>
    <div v-else-if="status === 4">
      <!-- 流水号审核通过，请补充身份证照片，真实姓名，银行卡号，银行卡照片 -->
      <status4 :status="'4'"></status4>
    </div>
    <div v-else-if="status === 5">
      <!-- 信息已提交，等待管理员审核 -->
      <p>您的信息提交成功，管理员审核中</p>
    </div>
    <div v-else-if="status === 6">
      <!-- 信息审核被拒绝，请再次提交身份证照片，真实姓名，银行卡号，银行卡照片 -->
      <status4 :status="'6'"></status4>
    </div>
  </div>
</template>

<script>
import { validatePhoneNumber } from '@/utils/validate'
import { getOrders, createOrders } from '@/api/orders'
import Status1 from './components/status1'
import Status4 from './components/status4'
export default {
  name: 'order',
  components: { Status1, Status4 },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validatePhoneNumber(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        this.phoneNumber = this.orderForm.username
        callback()
      }
    }
    return {
      orderForm: {
        referrerId: '',
        sellerType: ''
      },
      orderRules: {
        sellerType: [{ required: true, trigger: 'blur', validator: validateUsername }]
      },
      loading: false,
      options: [{
        value: '2',
        label: '推广员'
      }, {
        value: '3',
        label: '加盟商'
      }],
      value: '',
      status: 0,
      orderId: '',
      referrerId: '',
      sellerId: ''
    }
  },
  created() {
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
        this.orderId = res.data.data.id // 订单ID
        this.referrerId = res.data.data.referrerId
        this.sellerId = res.data.data.sellerId
      })
    },
    handleCreateOrder() {
      this.$refs.orderForm.validate(valid => {
        if (valid) {
          this.loading = true
          createOrders(this.orderForm.referrerId, this.orderForm.sellerType).then(response => {
            console.log(response.data)
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.order-container {
  .order-form.status0{
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }    
  }

}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.order-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .order-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_order {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
