<template>
    <div>
      <el-button type="text" @click="dialogFormVisible = true">上传资源</el-button>
<el-dialog title="资源上传" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="form" :style="{ 'max-width': '800px' }">
        <el-form-item label="大类别名称" prop="publish_category">
            <el-select v-model="form.publish_category" placeholder="请选择大类别">
               <el-option
              v-for="item in categories"
              :key="item.title"
              :label="item.title"
              :value="item.title">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="小类别名称" prop="magazine">
            <el-select v-model="form.magazine" placeholder="请选择小类别">
              <el-option
              v-for="item in filteredCategories"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="资源摘要" prop="abstract">
          <el-input type="textarea" v-model="form.abstract" :style="{width: '600px'}" :rows="5"></el-input>
        </el-form-item>
       <el-form-item label="作者名字"  prop="authorname">
          <!-- <el-input v-model="form.authorname" autocomplete="off" prop="authorname"> </el-input> -->
          <el-select v-model="form.authorname"  placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
        </el-select>
       </el-form-item>
       <el-form-item label="关键词" prop="keywords">
          <el-input v-model="form.keywords" autocomplete="off"  style="width: 600px"> </el-input>
       </el-form-item>
       <el-form-item label="评阅者姓名" prop="reviewer">
        <el-select v-model="form.reviewer" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
        </el-select>
        </el-form-item>
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
    :before-upload="beforeAvatarUpload"
    ref="uploadPdf"
    :http-request="uploadFile"
    accept=".pdf"
    >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <!-- <el-button type="primary">导入文件</el-button> -->
    <div class="el-upload__tip" slot="tip">请上传不超过500M的PDF文件</div>
    </el-upload>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="resetForm('form')">重 置</el-button>
    <el-button type="primary" @click="addclick">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
export default {
  name: 'Addresource',
  props: ['privateflag', 'categories'],
  data () {
    return {
      form: {
        //   name: '',
        publish_category: '',
        magazine: '',
        abstract: '',
        authorname: '',
        keywords: '',
        reviewer: []
      },
      file: {},
      dialogFormVisible: false,
      options: [],
      isLt2M: false
    }
  },
  computed: {
    filteredCategories () {
      console.log(this.categories.filter(category => category.title === this.form.publish_category))
      return this.form.publish_category === '' ? ['请先选择大类别'] : this.categories.filter(category => category.title === this.form.publish_category)[0].subTitle
    }
  },
  mounted () {
    this.$http.get('/api/find_user').then((res) => {
      this.options = res.data
      console.log('name:' + this.options)
    })
  },
  methods: {
    // resetForm () {
    //   this.form = {}
    //   this.isLt2M = false
    // },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.isLt2M = false
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
    },
    beforeAvatarUpload (file) {
      this.isLt2M = file.size / 1024 / 1024 < 500
      if (!this.isLt2M) {
        this.$message.error('上传文件大小不能超过 500MB!')
      }
    },
    addclick () {
      this.$refs.uploadPdf.submit()
      console.log('作者:' + this.form.authorname)
      // 携带文件必须使用此对象
      const formDatas = new FormData()
      if (this.isLt2M) {
        let reviewer = this.form.reviewer.join(';')
        // append方法逐个添加键值对
        formDatas.append('file', this.file) // 把文件实体添加到表单对象
        formDatas.append('publish_category', this.form.publish_category)
        formDatas.append('magazine', this.form.magazine)
        formDatas.append('abstract', this.form.abstract)
        formDatas.append('authors', this.form.authorname)
        formDatas.append('keywords', this.form.keywords)
        formDatas.append('reviewer', reviewer)
        // 发送axios请求
        console.log(reviewer + '-------' + this.form.authorname)
        this.$http.post('/api/upload', formDatas).then((res) => {
          console.log(res.data)
          if (res.data) {
            console.log('seccess!')
            this.dialogFormVisible = false
          }
        }).catch(error => {
          console.log(error)
        })
        const formDatas2 = new FormData()
        // append方法逐个添加键值对
        formDatas2.append('receivers', reviewer) // 把文件实体添加到表单对象
        formDatas2.append('filename', '【学术在线】-' + this.file.name)
        formDatas2.append('author', this.form.authorname)
        // 发送邮箱
        this.$http.post('/api/sendmail', formDatas2).then((res) => {
          console.log(res.data)
          if (res.data) {
            console.log('seccess!')
            this.dialogFormVisible = false
          }
        }).catch(error => {
          console.log(error)
        })
      }
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
