<!-- eslint-disable brace-style -->
<template>
    <div class="body">
        <div class="search">
            <h2 class="search_left">{{title}}</h2>
            <div class="Home">
              <el-link icon="el-icon-back"  @click="goBack">返回</el-link>
              <i v-if="flag==0" class="el-icon-edit"></i>
              <el-link v-if="flag==0" @click="dialogFormVisible = true">评阅标准</el-link>
            </div>
            <div class="search_main">
                <div>
                </div>
            </div>
            <Ava></Ava>
        </div>
        <div class="main">
          <el-dialog title="评阅标准" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form">
                     <el-form-item label="准确性">
                       <el-input  type="textarea" :rows="2" v-model="form.merit" autocomplete="off" placeholder="当评估知识图谱的准确性时，需要计算上传的三元组数据中正确的数量。这个指标可以帮助确定知识图谱中信息的准确程度，从而确保其知识的可靠性。"> </el-input>
                     </el-form-item>
                     <el-form-item label="一致性">
                       <el-input  type="textarea" :rows="2" v-model="form.defect_format" autocomplete="off" placeholder="评估知识图谱内部在逻辑上是否存在矛盾的内容。可以细分为语义一致性和结构一致性两个方面。"> </el-input>
                     </el-form-item>
                     <el-form-item label="完整性">
                        <el-input  type="textarea" :rows="2" v-model="form.defect_content" autocomplete="off" placeholder="评估知识图谱对目标领域的覆盖程度，需要考虑到知识图谱所涵盖的领域特定性以及目标知识的范围。"> </el-input>
                     </el-form-item>
                     <el-form-item label="简洁性">
                        <el-input  type="textarea" :rows="2" v-model="form.defect_language" autocomplete="off" placeholder="评估知识图谱中的信息表示是否简洁清晰，不冗余不重复。简洁性的提高有助于增强知识图谱的可读性和可维护性。"> </el-input>
                     </el-form-item>
                     <el-form-item label="时效性">
                        <el-input  type="textarea" :rows="2" v-model="form.defect_innovative" autocomplete="off" placeholder="评估知识图谱中知识更新及时且具有时效声明的程度。指标包括知识的更新程度以及是否具有时效声明，以确保知识图谱中的信息始终保持最新和有效。"> </el-input>
                     </el-form-item>
                     <el-form-item label="评阅结果">
                        <el-radio-group v-model="form.result">
                          <el-radio label="评阅通过"></el-radio>
                          <el-radio label="仍需修改"></el-radio>
                        </el-radio-group>
                     </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="resetForm">重 置</el-button>
              <el-button type="primary" @click="addclick">确 定</el-button>
            </div>
        </el-dialog>
        <div v-for="(mycomment,index) in comments" :key="index">
            <Comment2 :name="mycomment.user_name" :merit="mycomment.advantage" :defect_format="mycomment.format_problem" :defect_content="mycomment.content_problem" :defect_language="mycomment.language_problem" :defect_innovative="mycomment.innovation_problem" :result="mycomment.review_result" :time="mycomment.create_time"></Comment2>
      </div>
    </div>
    </div>
</template>

<script>
import Ava from './Ava.vue'
import Comment2 from './Comment2'
export default {
  name: 'Comments2',
  components: {
    Ava,
    Comment2
  },
  data () {
    return {
      flag: 1,
      title: '资源评阅标准',
      user_id: JSON.parse(sessionStorage.getItem('userinfo'))['_id'],
      username: JSON.parse(sessionStorage.getItem('userinfo'))['user_name'],
      comments: [],
      // comments: [{name: '王雨波',
      //   merit: '这个方向还没有人做过，比较新颖',
      //   defect_format: '字号格式有问题',
      //   defect_content: '讨论部分可以进一步完善',
      //   defect_language: '暂无',
      //   defect_innovative: '暂无',
      //   result: '审阅通过',
      //   time: 'Thu, 05 Jan 2023 22:45:16 GMT'
      // },
      // {name: '牛振东',
      //   merit: '你在做一种很新的东西',
      //   defect_format: '参考文献引用格式有问题，建议看看期刊要求',
      //   defect_content: '摘要感觉写的有点短，没有把亮点突出',
      //   defect_language: '一些语法问题，可以找机构润色一下',
      //   defect_innovative: '想几个点使创新性说服力更足',
      //   result: '仍需修改',
      //   time: 'Thu, 05 Jan 2023 22:59:33 GMT'}],
      academic_id: this.$route.params.academic_id,
      dialogFormVisible: false,
      form: {
        merit: '',
        defect_format: '',
        defect_content: '',
        defect_language: '',
        defect_innovative: '',
        result: ''

      }
    }
  },
  mounted () {
    this.academic_id = this.$route.params.academic_id + this.$route.params.flag.slice(0, -1)
    const lastChar = this.$route.path[this.$route.path.length - 1]
    console.log('Last character:', lastChar)
    this.flag = lastChar
    this.title = lastChar === '1' ? '资源评阅结果' : '资源评阅模板页'
    console.log('academic_id:', this.academic_id)
    this.showcomments()
  },

  methods: {
    showcomments () {
      var formdata = new FormData()
      formdata.append('academic_id', this.academic_id)
      this.$http.post('/api/show_comment_template', formdata).then((res) => {
        console.log(res.data)
        this.comments = res.data
      })
        .catch(error => {
          console.log(error)
        })
    },
    resetForm () {
      this.form = {}
    },
    goBack () {
      this.$router.back()
    },
    PassResouce () {
      var formdata = new FormData()
      formdata.append('academic_id', this.academic_id)
      this.$http.post('/api/review', formdata).then((res) => {
        console.log(res.data)
      })
        .catch(error => {
          console.log(error)
        })
    },
    addclick () {
      // alert('form-content:' + '优点:' + this.form.merit + '格式缺点:' + this.form.defect_format + '内容缺点:' + this.form.defect_content + '语言缺点:' + this.form.defect_language + '创新性缺点:' + this.form.defect_innovative + '评阅结果:' + this.form.result)
      var formdata = new FormData()
      formdata.append('academic_id', this.academic_id)
      formdata.append('user_id', this.user_id)
      formdata.append('advantage', this.form.merit)
      formdata.append('format_problem', this.form.defect_format)
      formdata.append('content_problem', this.form.defect_content)
      formdata.append('language_problem', this.form.defect_language)
      formdata.append('innovation_problem', this.form.defect_innovative)
      formdata.append('review_result', this.form.result)
      formdata.append('user_name', this.username)
      // 发送axios请求
      this.$http.post('/api/comment_template', formdata).then((res) => {
        console.log(res.data)
        this.resouces = res.data
      }).catch(function (error) {
        console.log(error)
      })
      this.dialogFormVisible = false
      this.showcomments()
      this.PassResouce()
    }
  }
}
</script>

<style scoped>
.body {
    height: 100vh;
    /* background-color: rgb(227, 75, 75); */
    /* color: aquamarine; */
}

.search {
    height: 10%;
    border-bottom: 2px solid gray;
    border-top: 2px solid gray;
    display: flex;
    flex-direction: row;
    /* padding: 0px 50px; */
    /* background-color: rgb(203, 236, 173); */
}
.search_left{
    width: 300px;
}
.search_main{
    flex: 1 1 auto;
    margin: 20px 200px;
}
.main {
    /* height: 90%;
    display: flex;
    flex-direction: row; */
    background-color: rgb(244, 244, 245);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: scroll;
    height:80%;
}

.leftBar {
    width: 300px;
    flex: 0 0 auto;
    height: 100%;
    overflow-y: auto;
    background-color:rgb(85, 94, 99);
}

.content {
    flex: 1 1 auto;
    background-color: rgb(255, 255, 255);
}
.Home,.addbtn{
  /* height: 100px; */
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
}
.addbtn{
  margin-left: 20px;
}

</style>
