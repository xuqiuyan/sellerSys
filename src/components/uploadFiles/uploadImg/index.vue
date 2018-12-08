<template>
  <div>
    <div id="uploadImgBlock" align="center" >
      <el-button type="primary" size="small">点击上传</el-button>
      <input type="file" @change="selectImg" ref="imgfile">
    </div>
  </div>
</template>
<style>
  #uploadImgBlock{
    position: relative;
    display: inline-block;
    background-color: rgba(248, 254, 255, 0.2);
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
    background-size: contain;
    background-position: center;
    background-repeat: none;
  }
  #uploadImgBlock input{
    position: absolute;
    top: 0;
    left: 0;
    width: 148px;
    height: 148px;
    opacity: 0;
  }
</style>

<script>
import COS from 'cos-js-sdk-v5'
import getAuth from '@/api/getAuth'
import Bus from '@/api/bus'
import { mapMutations } from 'vuex'
export default {
  name: 'UploadImg',
  data() {
    return {
      options: {
        Bucket: 'lottery-1255515741',
        Region: 'ap-shanghai'
      },
      cos: '',
      file: '',
      imgUrl: '',
      Key: ''
    }
  },
  created() {
    getAuth(this.authType).then(response => {
      this.cos = new COS({
        getAuthorization: function(options, callback) {
          callback({
            Authorization: response.data.data.authorization
          })
        }
      })
      this.Key = '/' + response.data.data.path
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    ...mapMutations({
      setUrl: 'SET_URL'
    }),
    uploadFile() {
      console.log('this.imgUrl' + this.imgUrl)
      this.cos.sliceUploadFile({
        Bucket: this.options.Bucket,
        Region: this.options.Region,
        Key: this.Key,
        Body: this.file
      }, (err, data) => {
        if (data) {
          this.imgUrl = 'https://' + data.Location
          this.$message.success('图片上传成功！')
          Bus.$emit(this.imgfoulder, this.imgUrl) // 发射 this.imgfoulder 事件，返回图片路径
        } else {
          this.msg = err
        }
      })
    },
    selectImg(e) {
      if (this.$refs.imgfile.files[0]) { // 判断是否有文件被选中
        const i = this.checkImg(this.$refs.imgfile.files[0]) // 检查文件
        if (i) {
          this.file = this.$refs.imgfile.files[0]
          this.uploadFun()
        } else {
          this.$refs.imgfile.value = null
        }
      } else {
        console.log('cancled selectImg')
      }
    },
    checkImg(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG / PNG格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      return true
    },
    uploadFun() {
      this.file && this.uploadFile()
    }
  },
  props: {
    imgfoulder: String,
    authType: String
  }
}

</script>