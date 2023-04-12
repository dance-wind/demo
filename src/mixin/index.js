import Vue from 'vue'
Vue.mixin({
  methods: {
    copyTextMixin (value) {
      const newInput = document.createElement(value.indexOf('</br>') > -1 ? 'textarea' : 'input')
      value = value.replace(/<\/br>/g, '')
      newInput.value = value
      document.body.appendChild(newInput)
      // 选中 input 元素中的文本
      // select() 方法用于选择该元素中的文本。
      newInput.select()
      // 执行浏览器复制命令
      //  execCommand 方法是执行一个对当前文档，当前选择或者给出范围的命令
      document.execCommand('Copy')
      // 清空输入框
      newInput.remove()
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    }
  }
})
