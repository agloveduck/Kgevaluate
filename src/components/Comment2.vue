<template>
   <div class="border">
    <div class="name"><i class="el-icon-user-solid"></i>
      {{ name }}
    </div>
    <div class="time">{{ time }}</div>
    <div class="content1">准确性:{{ merit }}</div>
    <div class="content2"> 一致性:{{ defect_format }} </div>
    <div class="content3"> 完整性:{{  defect_content}}</div>
    <div class="content4"> 简洁性:{{ defect_language }}</div>
    <div class="content5"> 时效性:{{ defect_innovative }}</div>
    <div class="content6"> 评阅结果: {{ result }}
    </div>
    <!-- <div class="time">{{ time }}</div> -->
   </div>
</template>
<script>

export default {
  name: 'Comment2',
  props: ['name', 'merit', 'defect_format', 'defect_content', 'defect_language', 'defect_innovative', 'result', 'time'],
  components: {
  },
  data () {
    return {
      user_id: JSON.parse(sessionStorage.getItem('userinfo'))['_id']
    }
  },
  methods: {

  },
  mounted () {
  }
}

</script>
<style scoped>
.border{
    border: 2px solid #696b6e;
    width: 800px;
    height: 320px;
    margin:30px 0;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.name{
  color: #409EFF;
  text-align: left;
}
.username {
    display: inline-block;
    font-weight: bold;
}

.content1{
  position: absolute;
  top: 8%;
  left: 10%;
  height: 15%;
  width: 80%;
  /* border: 2px solid #a6b7c8; */
  text-align: left;
  font-size: smaller;
}
.content2{
  position: absolute;
  top: 25%;
  left: 10%;
  height: 15%;
  width: 80%;
  /* border: 2px solid #a6b7c8; */
  text-align: left;
  font-size: smaller;
}
.content3{
  position: absolute;
  top: 42%;
  left: 10%;
  height: 15%;
  width: 80%;
  /* border: 2px solid #a6b7c8; */
  text-align: left;
  font-size: smaller;
}
.content4{
  position: absolute;
  top: 59%;
  left: 10%;
  height: 15%;
  width: 80%;
  /* border: 2px solid #a6b7c8; */
  text-align: left;
  font-size: smaller;
}
.content5{
  position: absolute;
  top: 76%;
  left: 10%;
  height: 15%;
  width: 80%;
  /* border: 2px solid #a6b7c8; */
  text-align: left;
  font-size: smaller;
}
.content6{
  position: absolute;
  top: 93%;
  left: 10%;
  height: 2%;
  width: 80%;
  text-align: center;
  color: #dd223e;
}
.time{
  position: absolute;
  top: 1%;
  left: 70%;
  height: 2%;
  /* width: 80%; */
  font-size: smaller;
  color: gray;
  display: block;
  width: 100%;
  text-align: left;
}
</style>
