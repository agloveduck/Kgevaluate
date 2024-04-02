<template>
  <div class="comment-section">
    <!-- 输入框和按钮用来发布评论 -->
    <div class="input-container">
      <!-- <input v-model="newComment" placeholder="请输入评论" /> -->
      <el-input
      type="textarea"
      placeholder="请输入评论"
      v-model="newComment"
      maxlength="200"
      show-word-limit>
      </el-input>
      <button @click="addComment">发布</button>
    </div>
    <!-- 一级评论的模板 -->
<div class="comment" v-for="(comment, index) in comments" :key="index">
  <div class="first-comment">
  <!-- 评论的用户名和内容 -->
  <div class="comment-header">
    <i class="el-icon-user-solid"></i>
    <span class="username" >{{ comment.user_name }}</span>
     <p class="content">{{ comment.content }}</p>
    <span class="time">{{ comment.create_time }}</span>
    <!-- 回复按钮，点击后弹出输入框，用来回复评论 -->
  <button class="reply-button" @click="showReplyInput(index)">回复</button>
  <button v-if="comment.user_name===username" class="reply-button" @click="showDeleteConfirm = true;  currentIndex = index">删除</button>
  <el-dialog
    title="确认删除"
    :visible.sync="showDeleteConfirm"
    width="30%"
    center
    >
    <span>确定要删除此评论吗？</span>
    <span slot="footer" class="dialog-footer">
      <el-button  @click="showDeleteConfirm = false">取 消</el-button>
      <el-button type="primary" @click="deleteComment ()">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</div>

  <!-- 二级评论的模板 -->
  <div class="secondary-comment-list">
    <div class="secondary-comment" v-for="(secondaryComment, secondaryIndex) in comment.replies" :key="secondaryIndex">
      <!-- 二级评论的用户名和内容 -->
      <div class="secondary-comment-header">
        <i class="el-icon-user-solid"></i>
        <span class="username">{{ secondaryComment.user_name }}</span>
        <p class="content">{{ secondaryComment.content }}</p>
        <span class="time">{{ secondaryComment.create_time }}</span>
       <button v-if="secondaryComment.user_name===username" class="reply-button2" @click="showDeleteConfirm2 = true; currentIndex = index; currentSecondaryIndex = secondaryIndex">删除</button>
       <el-dialog
    title="确认删除"
    :visible.sync="showDeleteConfirm2"
    width="30%"
    center
    >
    <span>确定要删除此评论吗？</span>
    <span slot="footer" class="dialog-footer">
      <el-button  @click="showDeleteConfirm2 = false">取 消</el-button>
      <el-button type="primary" @click=" deleteReply ()">确 定</el-button>
    </span>
  </el-dialog>
     </div>
    </div>
  </div>
    <!-- 如果当前评论有回复输入框，则渲染出来 -->
    <div v-if="replyIndex === index" class="reply-input-container">
          <el-input
          type="textarea"
          placeholder="请输入评论"
          v-model="newReply"
          maxlength="200"
          show-word-limit>
         </el-input>
          <button class="reply-button" @click="addReply(index)">回复</button>
        </div>
</div>
  </div>
</template>
<script>
export default {
  name: 'Comment',
  props: ['academic_id'],
  data () {
    return {
      // academic_id: '63a98dc1b37cf21c3542e7c1',
      user_id: JSON.parse(sessionStorage.getItem('userinfo'))['_id'],
      username: JSON.parse(sessionStorage.getItem('userinfo'))['user_name'],
      showDeleteConfirm: false,
      showDeleteConfirm2: false,
      // 用于存储评论数据的数组
      comments: [],
      currentIndex: null,
      currentSecondaryIndex: null,
      // 用于存储当前哪条评论需要回复
      replyIndex: -1,
      // 用于存储新评论的内容
      newComment: '',
      // 用于存储新回复的内容
      newReply: ''
    }
  },
  mounted () {
    this.showComment()
  },
  methods: {
    // 加载评论
    showComment () {
      var formdata = new FormData()
      formdata.append('academic_id', this.academic_id)
      this.$http.post('/api/show_comment', formdata).then((res) => {
        console.log(res.data)
        this.comments = res.data
      })
        .catch(error => {
          console.log(error)
        })
    },
    // 添加新评论的方法
    addComment () {
      // 测试发送一级评论功能后端接口
      var formdata = new FormData()
      formdata.append('user_id', this.user_id)
      formdata.append('user_name', this.username)
      formdata.append('academic_id', this.academic_id)
      formdata.append('content', this.newComment)
      // 发送axios请求
      this.$http.post('/api/comment', formdata).then((res) => {
        console.log(res.data)
        if (res.data) {
          console.log('seccess!')
        }
      }).catch(function (error) {
        console.log(error)
      })
      // 清空新评论的内容
      this.newComment = ''
      this.showComment()
    },
    // 显示回复输入框的方法
    showReplyInput (index) {
      this.replyIndex = index
    },
    // 添加新回复的方法
    addReply (index) {
      // alert('replyid:' + this.comments[index]._id)
      // 测试发送二级评论功能后端接口
      var formdata = new FormData()
      formdata.append('reply_id', this.comments[index]._id)
      formdata.append('user_id', this.user_id)
      formdata.append('user_name', this.username)
      formdata.append('academic_id', this.academic_id)
      formdata.append('content', this.newReply)
      // 发送axios请求
      this.$http.post('/api/reply_comment', formdata).then((res) => {
        console.log(res.data)
        if (res.data) {
          console.log('seccess!')
        }
      }).catch(function (error) {
        console.log(error)
      })
      // 隐藏回复输入框
      this.replyIndex = -1
      // 清空新回复的内容
      this.newReply = ''
      this.showComment()
    },
    // 删除一级评论
    deleteComment () {
      // this.comments.splice(this.currentIndex, 1)
      // // Reset the delete confirm flag and indexes
      // alert(this.comments[this.currentIndex]._id)
      var formdata = new FormData()
      formdata.append('comment_id', this.comments[this.currentIndex]._id)
      this.$http.post('/api/del_comment', formdata).then((res) => {
        console.log(res.data)
        if (res.data) {
          console.log('seccess!')
        }
      }).catch(function (error) {
        console.log(error)
      })
      this.currentIndex = null
      this.showComment()
      this.showDeleteConfirm = false
    },
    // 删除二级评论
    deleteReply (index, secondaryIndex) {
      // this.comments[this.currentIndex].replies.splice(this.currentSecondaryIndex, 1)
      // Reset the delete confirm flag and indexes
      // alert(this.comments[this.currentIndex].replies[this.currentSecondaryIndex]._id)
      var formdata = new FormData()
      formdata.append('comment_id', this.comments[this.currentIndex].replies[this.currentSecondaryIndex]._id)
      this.$http.post('/api/del_comment', formdata).then((res) => {
        console.log(res.data)
        if (res.data) {
          console.log('seccess!')
        }
      }).catch(function (error) {
        console.log(error)
      })
      this.showDeleteConfirm = false
      this.currentIndex = null
      this.currentSecondaryIndex = null
      this.showComment()
      this.showDeleteConfirm2 = false
    }
  }
}

</script>
<style scoped>
.reply-button {
  display: inline;
  float: right;
  color: #666;
  background-color: transparent;
  border: none;
}
.reply-button2 {
  display: inline;
  float: right;
  color: #666;
  background-color: transparent;
  border: none;
  font-size: smaller;
  margin-top: -20px;
}
.time{
  font-size: smaller;
  color: gray;
  display: block;
  width: 100%;
  text-align: left;
}
.comment-header,.secondary-comment-header{
  text-align: left;
}
.username{
  color: #409EFF;
}
.username,.content {
  display: inline-block;
}
.content{
  background-color:Transparent;
}
.comment-section {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f7f7f7;
  border-radius: 4px;
}

.input-container{
  display: flex;
  padding: 16px;
}

input[type="text"] {
  flex: 1;
  height: 40px;
  margin-right: 16px;
  border: none;
  border-radius: 4px 0 0 4px;
  background-color: #ffffff;
  font-size: 14px;
  color: #111111;
  padding: 0 12px;
}

button[type="button"] {
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 0 4px 4px 0;
  background-color: #ff0000;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
}

.comment-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment {
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 10px;
}
.comment {
  border: 2px solid#DCDFE6;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reply-input-container{
  margin-top: 10px;
  width: 700px;
}
.first-comment,.secondary-comment{
  border: 2px solid#EBEEF5;
  margin-top: 10px;
  width: 700px;
}
.secondary-comment-header {
  margin-left: 20px;
  font-size: smaller;
}
.comment .secondary-comment{
  border: 2px solid #E4E7ED;
  margin-top: 10px;
}

</style>
