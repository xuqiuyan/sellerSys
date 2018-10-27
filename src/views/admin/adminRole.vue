<template>
  <div  class="app-container">
    <br>
    <el-form :model="accountForm"  :rules="accountRules" ref="accountForm" label-width="120px" width="500px">
      <el-form-item label="手机号"  prop="mobile">
        <el-input v-model="accountForm.mobile" name="mobile" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="姓名"  prop="realname">
        <el-input v-model="accountForm.realname" name="realname"></el-input>
      </el-form-item>
      <el-form-item label="密码"  prop="password">
        <el-input v-model="accountForm.password" name="password"></el-input>
      </el-form-item>
      <el-form-item label="角色"  prop="roles">
        <el-checkbox-group v-model="accountForm.roles" name="roles">
          <el-checkbox label="admin">管理员</el-checkbox>
          <el-checkbox label="accountant">财务</el-checkbox>
          <el-checkbox label="cashier">出纳</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form> 
  </div>
</template>
<script>
import { addAccount } from '@/api/account'
import { Message } from 'element-ui'
import { validatePhoneNumber } from '@/utils/validate'
export default {
  name: 'AdminRole',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validatePhoneNumber(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        this.phoneNumber = this.accountForm.mobile
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        mobile: '',
        realname: '',
        password: '',
        roles: []// “admin”, “cashier”, ”accountant”
      },
      accountRules: {
        mobile: [{ required: true, trigger: 'blur', validator: validateUsername }],
        realname: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        roles: [{ required: true, message: '请选择角色' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          this.loading = true
          addAccount(this.accountForm).then(res => {
            if (res.data.code === 0) {
              Message({
                message: '账号添加成功！',
                type: 'success'
              })
            } else {
              Message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
        } else {
          console.log('表单验证失败！')
          return false
        }
      })
    }
  }
}
</script>
