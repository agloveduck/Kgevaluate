<template>
   <div>
    <el-button  @click="download">{{ downloadbtn }}</el-button>
    <el-button  @click="preview">{{previewbtn}}</el-button>
  </div>
</template>

<script>

export default {
  name: 'Showpdf',
  components: {},
  props: ['academic_id', 'filename', 'flag', 'num'],
  data () {
    return {
      downloadbtn: '',
      previewbtn: ''
    }
  },
  mounted () {
    if (this.flag === 0) {
      this.downloadbtn = '下载当前版本'
      this.previewbtn = '预览当前版本'
    }
    if (this.flag === 1) {
      this.downloadbtn = '下载历史版本' + this.num
      this.previewbtn = '预览历史版本' + this.num
    }
  },
  methods: {
    preview () { // 文件预览
      var formdata = new FormData()
      formdata.append('academic_id', this.academic_id)
      // 发送axios请求
      this.$http.post('/api/show_resource', formdata, {responseType: 'arraybuffer'}).then((res) => {
        const binaryData = []
        binaryData.push(res.data)
        // 获取blob链接
        let pdfUrl = window.URL.createObjectURL(
          new Blob(binaryData, { type: 'application/pdf' })
        )
        if (pdfUrl) {
          window.open(pdfUrl)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },

    download () { // 下载csv格式文件
      var formdata = new FormData()
      formdata.append('academic_id', this.academic_id)
      // 发送axios请求
      this.$http.post('/api/download', formdata, {responseType: 'arraybuffer'}).then((res) => {
        let blob = new Blob([res.data], {
          type: 'application/pdf;charset=utf-8'
        })
        let downloadElement = document.createElement('a')
        let href = window.URL.createObjectURL(blob) // 创建下载的链接
        downloadElement.href = href
        // var fileNameCode = res.headers['content-disposition'].split(';')[1].split('filename=')[1] + '.pdf'
        var fileNameCode = this.filename + '.csv'
        // alert('文件名:' + fileNameCode)
        downloadElement.download =
        decodeURI(
          fileNameCode
        ) // 下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放掉blob对象
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.button-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.download-btn {
  font-size: 14px;
  height: 36px;
  width: 100px;
  border-radius: 18px;
  margin-right: 10px;
}

.preview-btn {
  font-size: 14px;
  height: 36px;
  width: 100px;
  border-radius: 18px;
}
</style>
