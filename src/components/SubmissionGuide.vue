<template>
    <div>
        <!-- <h2 class="search_left">投稿指南</h2> -->
        <div class="search">
            <h2 class="search_left">审核指南</h2>
            <div class="Home">
              <el-link icon="el-icon-s-home"  href="#/home" >主页</el-link>
            </div>
            <div class="search_main">
               <div class="wai">
                  <el-select v-model="value" clearable placeholder="请选择">
                   <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :size="medium">
                  </el-option>
                </el-select>
                    <i slot="suffix" class="el-input__icon el-icon-search"  @click="searchclick"></i>
                  </div>
            </div>
            <Ava></Ava>
        </div>
        <p v-html=info></p>
    </div>
</template>
<script>
import Ava from './Ava.vue'
export default {
  name: 'SubmissionGuide',
  components: {
    Ava
  },
  data () {
    return {
      info: '',
      options: [{
        value: 'ACM COMPUTING SURVEYS',
        label: 'ACM COMPUTING SURVEYS'
      }, {
        value: 'ACM JOURNAL ON EMERGING TECHNOLOGIES IN COMPUTING SYSTEMS',
        label: 'ACM JOURNAL ON EMERGING TECHNOLOGIES IN COMPUTING SYSTEMS'
      }, {
        value: 'ACM SIGPLAN NOTICES',
        label: 'ACM SIGPLAN NOTICES'
      }, {
        value: 'ACM TRANSACTIONS ON INFORMATION SYSTEMS',
        label: 'ACM TRANSACTIONS ON INFORMATION SYSTEMS'
      }, {
        value: 'COMPUTER COMMUNICATION REVIEW',
        label: 'COMPUTER COMMUNICATION REVIEW'
      },
      {
        value: 'IEEE TRANSACTIONS ON KNOWLEDGE AND DATA ENGINEERING',
        label: 'IEEE TRANSACTIONS ON KNOWLEDGE AND DATA ENGINEERING'
      },
      {
        value: 'IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE',
        label: 'IEEE TRANSACTIONS ON PATTERN ANALYSIS AND MACHINE INTELLIGENCE'
      },
      {
        value: 'JOURNAL OF THE ACM',
        label: 'JOURNAL OF THE ACM'
      }],
      value: ''
    }
  },
  mounted () {
    // this.showinfo()
  },
  methods: {
    showinfo () {
      // alert(this.value)
      var formdata1 = new FormData()
      formdata1.append('manageName', this.value)
      this.$http.post('/api/submissionguideline', formdata1).then((res) => {
        console.log(res.data)
        this.info = res.data
      })
    },
    searchclick () {
      this.showinfo()
    }
  }
}
</script>
<style scoped>
.wai{
    width: 200px;
    display: flex;
    flex-direction: row;
    border: 2px solid #409EFF
}
.Home{
  /* height: 100px; */
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
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
</style>
