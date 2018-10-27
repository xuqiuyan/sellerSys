<template>
  <el-form-item prop="verifyCode">
    <span class="svg-container">
      <svg-icon icon-class="code"></svg-icon>
    </span>
    <el-input name="code" v-model="code" placeholder="请输入验证码"></el-input>
      <span class="get-code" @click="getCode">{{msg}}</span>
  </el-form-item>
</template>
<script>
import { validateVerifyCode, validatePhoneNumber } from '@/utils/validate'
export default{
  name: 'GetCode',
  data() {
    return {
      code: '',
      msg: '获取验证码'
    }
  },
  methods: {
    getCode() {
      if (!validatePhoneNumber(this.phone)) {
        this.$message({
          message: '请输入正确手机号！',
          type: 'warning'
        })
        return
      }
      validateVerifyCode(this.phone).then(res => {
        this.$message({
          message: '验证码发送成功！',
          type: 'success'
        })
        this.getCodeAgain()
      })
    },
    getCodeAgain() {
      var i = 59
      const t = setInterval(() => {
        this.msg = i + 's后再次获取'
        i--
        if (i === 0) {
          clearInterval(t)
          this.msg = '获取验证码'
        }
      }, 1000)
    }
  },
  watch: {
    msg(oldmsg, newmsg) {
    }
  },
  props: {
    phone: String
  }
}
</script>
 <style scoped>
  .get-code{
    position: absolute;
    right: 10px;
    top: 7px;
    cursor: pointer;
    font-size: 12px;
    color: #889aa4
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
 </style>
 