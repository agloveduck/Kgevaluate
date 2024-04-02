<template>
    <div>
      <el-link type="primary" @click="download">下载</el-link>
      <el-link type="primary" @click="preview">预览</el-link>
   </div>
 </template>

<script>

export default {
  name: 'Showtemplate',
  components: {},
  props: ['academic_id', 'filename'],
  data () {
    return {
    }
  },
  methods: {
    preview () { // 文件预览
      var formdata = new FormData()
      formdata.append('template_id', this.academic_id)
      // 发送axios请求
      this.$http.post('/api/show_template', formdata, {responseType: 'arraybuffer'}).then((res) => {
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
    download () {
      var formdata = new FormData()
      formdata.append('template_id', this.academic_id)
      // 发送axios请求
      this.$http.post('/api/download_template', formdata, {responseType: 'arraybuffer'}).then((res) => {
        let blob = new Blob([res.data], {
          type: 'application/pdf;charset=utf-8'
        })
        let downloadElement = document.createElement('a')
        let href = window.URL.createObjectURL(blob) // 创建下载的链接
        downloadElement.href = href
        // var fileNameCode = res.headers['content-disposition'].split(';')[1].split('filename=')[1] + '.pdf'
        var fileNameCode = this.filename + '.pdf'
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

 <style >
 </style>
