<template>
    <div>
       <h1>新增出版物类别</h1>
       <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="出版物类别名称" prop="category_name">
          <el-input v-model="form.category_name"></el-input>
        </el-form-item>
        <el-form-item label="出版物类别描述" prop="category_des">
          <el-input type="textarea" v-model="form.category_des"></el-input>
        </el-form-item>
        <el-form-item label="是否私有" prop="isprivate">
          <el-switch v-model="form.is_private" active-value= 1
            inactive-value= 0>
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
       </el-form>
    </div>
  </template>

<script>
export default {
  name: 'CategoryAdd',
  data () {
    return {
      form: {
        category_name: '',
        category_des: '',
        create_id: '123',
        is_private: 0

      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.form)
      // const formdata = new FormData(this.form)
      var formdata = new FormData()
      formdata.append('category_name', this.form.category_name)
      formdata.append('category_des', this.form.category_des)
      formdata.append('create_id', this.form.create_id)
      formdata.append('is_private', this.form.is_private)
      // 发送axios请求
      this.$http.post('/api/add_category', formdata).then((res) => {
        console.log(res.data)
        if (res.data) {
          console.log('seccess!')
          this.$router.push('/JournalCenter')// 切换路由
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>

  <style>
  </style>
