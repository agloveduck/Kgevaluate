<template>
    <div>
      <el-button type="text" @click="dialogFormVisible = true">上传模板文件</el-button>
      <el-dialog title="模板信息" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form">
          <el-form-item label="上传者">
          <el-select v-model="form.authorname"  placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
         </el-form-item>
         <el-form-item label="模板文件简介">
          <el-input type="textarea" v-model="form.abstract" prop="abstract"></el-input>
       </el-form-item >
        </el-form>
        <div class="hh">
         <el-upload
    class="upload-demo"
    drag
    action="#"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :multiple="false"
    ref="uploadPdf"
    :http-request="uploadFile"
    accept=".pdf"
    >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <!-- <el-button type="primary">导入文件</el-button> -->
    <div class="el-upload__tip" slot="tip">只能上传PDF文件</div>
    </el-upload>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="resetForm">重 置</el-button>
    <el-button type="primary" @click="addclick">确 定</el-button>
  </div>
      </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'Addtemplate',
  data () {
    return {
      form: {
        authorname: '',
        abstract: ''
      },
      file: {},
      dialogFormVisible: false,
      options: []
    }
  },
  mounted () {
    this.$http.get('/api/find_user').then((res) => {
      this.options = res.data
      console.log('name:' + this.options)
    })
  },
  methods: {
    resetForm () {
      this.form = {}
    },
    addclick () {
      this.$refs.uploadPdf.submit()
      console.log('作者:' + this.form.authorname)
      // 携带文件必须使用此对象
      const formDatas = new FormData()
      formDatas.append('file', this.file) // 把文件实体添加到表单对象
      formDatas.append('abstract', this.form.abstract)
      formDatas.append('authors', this.form.authorname)
      this.$http.post('/api/upload_template', formDatas).then((res) => {
        console.log(res.data)
      })
      this.dialogFormVisible = false
      this.$emit('update-data') // 子组件给父组件传值
    },
    // 自定义上传方法，使用上传组件的submit()后才会触发以获取文件实体
    uploadFile (param) {
      this.file = param.file
    },
    // 限制上传文件数量
    handleExceed () {
      this.$alert('文件数量超过限制', {
        confirmButtonText: '确定'
      })
    }

  }
}
</script>
<style scoped>
.hh{
      /*实现垂直居中*/
    display: flex;
    align-items: center;
  /*实现水平居中*/
    justify-content: center;
    /* background-color: rgb(192, 198, 198); */
}
</style>
