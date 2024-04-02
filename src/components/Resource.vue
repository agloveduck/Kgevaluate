<template>
    <div class="resource">
        <el-tabs type="border-card" class="con1">
           <el-tab-pane label="资源名称">
           <h3>
            {{name}} Version:{{ version }}
          </h3>
          <h3 class="pass" v-if="version>='1.0'">已审阅通过</h3>
          <h3 class="pass" v-if="version<'1.0'">{{review_result}}</h3>
          </el-tab-pane>
           <el-tab-pane label="资源摘要">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{abstract}}</el-tab-pane>
           <el-tab-pane label="资源详情">
            <Showpdf :academic_id=academic_id :flag=0 :filename=name></Showpdf>
           </el-tab-pane>
           <el-tab-pane label="查看历史版本" v-if="version!='0.1'">
            <div v-for="(item,index) in histoy_id" :key="index" style="margin: 20px">
              <Showpdf :academic_id=item.academic_id :flag=1 :filename=name :num=item.vers></Showpdf>
            </div>
           </el-tab-pane>
       </el-tabs>
        <div class="con">
          <h2>
          <span>{{ title }}</span>
          <span>{{ subtitle }}</span>
          </h2>

            <div class="links">
              <el-link type="primary" @click="goToComments2(academic_id,1)">资源评阅结果</el-link>
              <!-- <el-link type="primary" @click="goToComments(academic_id)">资源评论页</el-link> -->
              <br>
              <i class="el-icon-s-promotion"></i>
              <el-link type="primary">提交</el-link>
              <el-link type="primary">正式提交</el-link>
            </div>
            <h3>创建时间:{{ create_time }}</h3>
        </div>
    </div>
</template>
<script>
import Showpdf from './Showpdf.vue'
export default {
  name: 'Resource',
  props: ['name', 'subtitle', 'abstract', 'academic_id', 'title', 'create_time', 'version', 'review_result'],
  components: {
    Showpdf
  },
  data () {
    return {
      user_id: JSON.parse(sessionStorage.getItem('userinfo'))['_id'],
      histoy_id: [],
      flag: 0
    }
  },
  methods: {
    // goToComments (academicId) {
    //   this.$router.push({ path: '/Comments/' + academicId })
    // },
    goToComments2 (academicId, flag) {
      this.$router.push({ path: '/Comments2/' + academicId + flag })
    },
    showHistoy () {
      var formdata = new FormData()
      formdata.append('publish_category', this.title)
      formdata.append('magazine', this.subtitle)
      formdata.append('user_id', this.user_id)
      formdata.append('academic_name', this.name)
      this.$http.post('/api/search_history_version', formdata).then((res) => {
        console.log('历史版本:' + res.data)
        this.histoy_id.splice(0, this.histoy_id.length)
        let len = res.data.length
        for (let i = 0; i < len; i++) {
          let cat = {}
          cat.academic_id = res.data[i]._id
          let vers = 'V' + res.data[i].version_first + '.' + res.data[i].version_second
          cat.vers = vers
          this.histoy_id.push(cat)
        }
      })
        .catch(error => {
          console.log(error)
        })
    }

  },
  mounted () {
    this.showHistoy()
  }
}

</script>
<style scoped>
 html {
    font-size: 16px;
  }
  .pass{
    position: absolute;
    top: 0;
    font-size: 0.8rem;
    color: rgb(225, 13, 13);
  }
  .resource{
    border: 0.125rem solid #409EFF; /* 2px */
    width: 800px; /* 800px */
    height: 300px; /* 300px */
    margin: 2rem 0;
    display: flex;
    justify-content: flex-start;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, .12), 0 0 0.375rem rgba(0, 0, 0, .04);
}

.con1{
    width: 600px; /* 600px */
    height: 298px; /* 298px */
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
    position: relative;
}

.con{
    /* border: 0.0625rem solid rgb(224, 200, 232); */
    width: 200px; /* 200px */
    height: 300px; /* 300px */
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
    position: relative;
}

.con h3 {
  position: absolute;
  bottom: 0;
  font-size: 0.75rem; /* 12px */
  color: rgb(187, 181, 181);
}

.con h2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.ziy{
    color: #409EFF;
}

</style>
