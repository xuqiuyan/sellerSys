<template>
  <div  class="app-container">
    <br>
    <el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm"  label-width="120px" width="500px">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input v-model="pwdForm.oldPwd" name="oldPwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="pwdForm.newPwd" name="newPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form> 
  </div>
</template>
<script>
import { changePwd } from '@/api/account'
export default {
  name: 'ChangePwd',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        oldPwd: '',
        newPwd: ''
      },
      pwdRules: {
        oldPwd: [{ required: true, validator: validatePass }],
        newPwd: [{ required: true, validator: validatePass }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.pwdForm.validate(valid => {
        if (valid) {
          changePwd(this.pwdForm).then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: '账号添加成功！',
                type: 'success'
              })
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
        }
      })
    }
  }
}
</script>
