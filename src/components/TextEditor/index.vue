<template>
  <div class="text-editor" ref="editor"></div>
</template>

<script>
// import { uploadCourseImage } from '@/services/course'
import E from 'wangeditor'
const data = {
  name: '图片链接'
}
export default {
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.initEditor()
  },
  data () {
    return {
      editor: null,
      // 用于标记编辑的数据是否加载完毕
      isLoaded: false
    }
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor)
      // 创建富文本编辑器之前进行事件设置
      editor.config.onchange = value => {
        this.$emit('input', value)
      }
      // 配置自定义的图片上传功能
      editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        // const { data } = await uploadCourseImage(fd)
        // 通过insertImgFn传回给富文本比纳基器进行展示
        insertImgFn(data.name)
      }
      editor.create()
      editor.txt.html(this.value)
      this.editor = editor
    }
  },
  watch: {
    value () {
      if (this.isLoaded === false) {
        // 得到了加载的新数据，设置给富文本编辑器
        this.editor.txt.html(this.value)
        this.isLoaded = true
      }
    }
  }
}
</script>

<style>

</style>
