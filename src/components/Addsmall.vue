<template>
    <div>
      <el-button type="text" @click="dialogFormVisible = true">添加小类别</el-button>
<el-dialog title="小类别信息" :visible.sync="dialogFormVisible">
  <el-form :model="form" ref="form" size="mini">
    <el-form-item label="所属大类别类别">
      <!-- <el-input v-model="form.category_id" autocomplete="off" prop="category_id"> </el-input> -->
      <el-select v-model="form.category_name"  placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item.title"
              :label="item.title"
              :value="item.title">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="小类别名称">
      <el-input v-model="form.publish_name" autocomplete="off" prop="publish_name"> </el-input>
    </el-form-item>
    <el-form-item label="小类别简称">
      <el-input v-model="form.publish_short_name" autocomplete="off" prop="publish_short_name"> </el-input>
    </el-form-item>
    <el-form-item label="publish_partition">
      <el-input v-model="form.publish_partition" autocomplete="off" prop="publish_partition"> </el-input>
    </el-form-item>
    <el-form-item label="小类别描述">
      <el-input type="textarea" v-model="form.publish_des" prop="publish_des"></el-input>
   </el-form-item >
   <el-form-item label="小类别语言">
      <el-input v-model="form.publish_language" prop="publish_language"></el-input>
   </el-form-item >
   <el-form-item label="小类别页数">
      <el-input v-model="form.publish_pages" prop="publish_pages"></el-input>
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
  name: 'Addsmall',
  props: ['privateflag', 'categories'],
  data () {
    return {
      // biginput: '',
      // bigdisinput: ''
      options: [],
      dialogFormVisible: false,
      show_private: this.privateflag,
      form: {
        category_name: '',
        publish_name: '',
        publish_short_name: '',
        desc: '',
        publish_des: '',
        publish_language: '',
        publish_pages: 1,
        is_private: 0
      }
    }
  },
  // mounted () {
  //   this.$http.get('/api/find_user').then((res) => {
  //     this.options = res.data
  //     console.log('name:' + this.options)
  //   })
  // },
  methods: {
    resetForm () {
      this.form = {}
    },
    addclick () {
    //   alert('form:' + this.form.is_private + this.form.name + this.form.desc + JSON.parse(sessionStorage.getItem('userinfo'))['_id'])
      var formdata = new FormData()
      formdata.append('category_name', this.form.category_name)
      formdata.append('publish_name', this.form.publish_name)
      formdata.append('publish_short_name', this.form.publish_short_name)
      formdata.append('publish_partition', this.form.publish_partition)
      formdata.append('publish_des', this.form.publish_des)
      formdata.append('publish_language', this.form.publish_language)
      formdata.append('publish_pages', this.form.publish_pages)
      formdata.append('publish_home_page', 1)
      formdata.append('publish_template_link', '123')
      formdata.append('publish_community_link', '123')
      formdata.append('publish_others', '暂无')
      formdata.append('create_id', JSON.parse(sessionStorage.getItem('userinfo'))['_id'])
      formdata.append('is_private', this.form.is_private)
      // 发送axios请求
      this.$http.post('/api/add_magazine', formdata).then((res) => {
        console.log(res.data)
        if (res.data) {
          console.log('seccess!')
        }
      })
      this.dialogFormVisible = false
      this.$emit('update-data') // 子组件给父组件传值
    }

  }
}
</script>
<style>

</style>
