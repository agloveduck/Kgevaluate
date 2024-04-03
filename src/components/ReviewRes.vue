<template>
    <div class="resource">
        <el-tabs type="border-card" class="con1">
          <el-tab-pane label="资源名称"> <h3>{{name}} Version:{{ version }}</h3>
            <h4>上传者:{{authors}}</h4>
            <!-- <h3 class="pass" v-if="version>='1.0'">已审阅通过</h3> -->
            <h3 class="pass">{{review_status}}</h3>
        </el-tab-pane>
           <el-tab-pane label="资源简介">{{abstract}}</el-tab-pane>
           <el-tab-pane label="资源详情">
            <Showpdf :academic_id=academic_id :flag=0 :filename=name></Showpdf>
           </el-tab-pane>
             <!-- New tab pane for displaying an image -->
             <el-tab-pane label="资源查看">
                <img src="../assets/triples.png" alt="Resource Image" style="width: 100%; height: auto;">
            </el-tab-pane>
       </el-tabs>
        <div class="con">
          <h2>{{ title }} {{ subtitle }}</h2>
            <div class="links">
              <el-link v-if="user_role==='超级管理员'" type="primary" @click="showConfirm = true">通过</el-link>
              <!-- <el-link type="primary" @click="goToComments(academic_id)">评阅</el-link> -->
              <el-link type="primary" @click="goToComments2(academic_id,0)">评阅标准</el-link>
            </div>
            <h3 class="time">创建时间:{{ create_time }}</h3>
        </div>
        <el-dialog
         title="确认通过"
         :visible.sync="showConfirm"
         width="30%"
         center
          >
         <span>确定要通过"{{name}} Version:{{ version }}"吗？</span>
         <span slot="footer" class="dialog-footer">
        <el-button  @click="showConfirm = false">取 消</el-button>
        <el-button type="primary" @click="PassResouce ()">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import Showpdf from './Showpdf.vue'
export default {
  name: 'ReviewRes',
  props: ['name', 'subtitle', 'abstract', 'academic_id', 'create_time', 'title', 'version', 'review_status', 'authors'],
  components: {
    Showpdf
  },
  data () {
    return {
      user_role: JSON.parse(sessionStorage.getItem('userinfo'))['user_role'],
      showConfirm: false
    }
  },
  methods: {
    // goToComments (academicId) {
    //   this.$router.push({ path: '/Comments/' + academicId })
    // },
    goToComments2 (academicId, flag) {
      this.$router.push({ path: '/Comments2/' + academicId + flag })
    },
    PassResouce () {
      var formdata = new FormData()
      formdata.append('academic_id', this.academic_id)
      formdata.append('isPass', '通过')
      this.$http.post('/api/review', formdata).then((res) => {
        console.log(res.data)
      })
        .catch(error => {
          console.log(error)
        })
      this.showConfirm = false
      this.successopen()
    },
    successopen () {
      this.$message({
        message: '您已将资源通过',
        type: 'success'
      })
    }
  }
}

</script>
<style scoped>
.pass{
  position: absolute;
  top: 0;
  font-size: smaller; /* or you can use a specific font size value, like 14px */
  color: rgb(225, 13, 13);
}
.resource{
    border: 2px solid #409EFF;
    width: 900px;
    height: 320px;
    margin:30px 0;
    display: flex;
    justify-content: flex-start;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.con1{
    width: 600px;
    height: 318px;
     /*实现垂直居中*/
    align-items: center;
  /*实现水平居中*/
    justify-content: center;
}
.con{
    /* border: 1px solid rgb(224, 200, 232); */
    display: flex;
    width: 280px;
    height: 320px;
     /*实现垂直居中*/
    align-items: center;
  /*实现水平居中*/
    justify-content: center;
    position: relative;
}
.time {
  position: absolute;
  bottom: 0;
  font-size: smaller; /* or you can use a specific font size value, like 14px */
  color: gray;
}
.con h2 {
  position: absolute;
  top: 0;
  width: 100%; /* make the h2 element the full width of the div */
  text-align: center; /* center the text within the h2 element */
}
.links {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ziy,h4{
    color: #409EFF;
}

</style>
