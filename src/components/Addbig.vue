<template>
    <div>
      <el-button type="text" @click="dialogFormVisible = true">添加疾病分类</el-button>

<el-dialog title="疾病分类信息" :visible.sync="dialogFormVisible">
  <el-form :model="form" ref="form">
    <el-form-item label="疾病分类名称">
      <el-input v-model="form.name" autocomplete="off" prop="name"> </el-input>
    </el-form-item>
    <el-form-item label="疾病分类描述">
      <el-input type="textarea" v-model="form.desc" prop="desc"></el-input>
   </el-form-item >
   <el-form-item label="是否私有" prop="isprivate"  v-show="show_private">
          <el-switch v-model="form.is_private" active-value= 1
            inactive-value= 0>
          </el-switch>
        </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="resetForm">重 置</el-button>
    <el-button type="primary" @click="addclick">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
export default {
  name: 'Addbig',
  props: ['privateflag'],
  data () {
    return {
      // biginput: '',
      // bigdisinput: ''
      dialogFormVisible: false,
      show_private: this.privateflag,
      form: {
        name: '',
        desc: '',
        is_private: 0
      }
    }
  },
  methods: {
    resetForm () {
      this.form = {}
    },
    addclick () {
      // alert('form:' + this.form.is_private + this.form.name + this.form.desc + JSON.parse(sessionStorage.getItem('userinfo'))['_id'])
      var formdata = new FormData()
      formdata.append('category_name', this.form.name)
      formdata.append('category_des', this.form.desc)
      formdata.append('create_id', JSON.parse(sessionStorage.getItem('userinfo'))['_id'])
      formdata.append('is_private', this.form.is_private)
      // 发送axios请求
      this.$http.post('/api/add_category', formdata).then((res) => {
        console.log(res.data)
        if (res.data) {
          console.log('seccess!')
          this.dialogFormVisible = false
        }
      })
      this.$emit('update-data') // 子组件给父组件传值
    }

  }
}
</script>
<style>

</style>
