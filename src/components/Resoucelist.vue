<template>
    <div class="resourcelist">
      <div v-for="(resouce,index) in displayedResources" :key="index">
             <Resource :name="resouce.academic_name" :abstract="resouce.abstract" :subtitle="resouce.magazine" :title="resouce.publish_category" :academic_id="resouce._id" :create_time="resouce.create_time" :version="resouce.version_first+'.'+resouce.version_second " :review_result="resouce.review_result"></Resource>
      </div>
      <el-pagination
      layout="prev, pager, next"
      :total=total
      :page-size=pageSize
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
    </div>
</template>
<script>
import Resource from './Resource'
export default {
  name: 'Resoucelist',
  props: ['resouces', 'total'],
  // props: ['title', 'subtitle'],
  data () {
    return {
      currentPage: 1,
      pageSize: 2
    }
  },
  components: {
    Resource
  },
  methods: {// 定义方法
    handleCurrentChange (val) {
      this.currentPage = val
    }
  },
  mounted () {
    // alert('长度:' + this.resouces.length
  },
  computed: {
    displayedResources () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.resouces.slice(start, end)
    }
  }

}

</script>
<style scoped>
.resourcelist {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto; /* 使用 overflow-y 而非 overflow */
  height: 100%; /* 请确认父元素的高度为 100% */
}

.resourcelist > div {
  flex: 1; /* 将子元素的 flex 属性设置为 1 */
}

</style>
