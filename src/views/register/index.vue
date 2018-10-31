<template>
  <div class="register-container">
    <el-form class="register-form" autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm" label-position="left">
      <h3 class="title">商户管理后台</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_register">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="registerForm.username" autoComplete="on" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="registerForm.password" autoComplete="on"
          placeholder="请输入密码"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item prop="username">
        <span class="svg-container svg-container_register">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="referrerId" type="text" v-model="registerForm.referrerId" autoComplete="on" placeholder="请输入推荐人手机号" />
      </el-form-item>
      
      <div><get-code :phone="phoneNumber" ref="code"></get-code></div>
      
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleRegister">
          注册
        </el-button>
      </el-form-item>
      <p style="color:#fff;text-align:right">已有账号？去 <router-link to="register">登录</router-link></p>
      
    </el-form>
  </div>
</template>

<script>
import { validatePhoneNumber, validateVerify } from '@/utils/validate'
import GetCode from '@/components/GetCode'
export default {
  name: 'register',
  components: { GetCode },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validatePhoneNumber(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        this.phoneNumber = this.registerForm.username
        callback()
      }
    }
    // const validateReferrerId = (rule, value, callback) => {
    //   if (!validatePhoneNumber(value)) {
    //     callback(new Error('请输入正确手机号'))
    //   }
    // }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        referrerId: '',
        verifyCode: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      verify: false,
      phoneNumber: ''
    }
  },
  created() {
    // this.ifVerify()
  },
  methods: {
    ifVerify() {
      validateVerify().then(response => {
        // 判断是否外网登录，是 则需要获取验证码验证
        this.verify = response.data.data
      })
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleRegister() {
      if (this.verify) {
        // 获取验证码
        this.registerForm.verifyCode = this.$refs.code.code
      }
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Register', this.registerForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('验证失败！')
          return false
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
.register-container {
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

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.register-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .register-form {
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
    &_register {
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
