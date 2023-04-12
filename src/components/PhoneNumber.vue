<template>
  <div>
    <el-table :data="items">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column label="Key">
        <template slot-scope="scope">
          {{ scope.row.key ? maskPhoneNumber(scope.row.key) : '******' }}
          <el-button type="text" @click="showKey(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="输入验证码" @close="clearDialogData">
      <div class="dialog-content">
        <p>
          我们已向手机{{ maskedPhoneNumber }}发送了一条验证短信，请输入短信中的验证码：
        </p>
        <el-input v-model="code" placeholder="请输入验证码" class="input-with-btn"></el-input>
        <el-button :disabled="countDown > 0" class="code-btn" @click="getCode">{{ codeBtnText }}</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, key: '' },
        { id: 2, key: '' },
      ],
      dialogVisible: false,
      maskedPhoneNumber: '',
      countDown: 0,
      codeBtnText: '获取验证码',
      code: '',
      phoneNumber: '13812345678',
    };
  },
  methods: {
    showKey(row) {
      this.maskedPhoneNumber = this.maskPhoneNumber(this.phoneNumber);
      this.currentItem = row;
      this.dialogVisible = true;
    },
    maskPhoneNumber(phoneNumber) {
      return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    clearDialogData() {
      this.code = '';
      this.countDown = 0;
      this.codeBtnText = '获取验证码';
    },
    getCode() {
      this.countDown = 60;
      const timer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
          this.codeBtnText = `${this.countDown}s后重发`;
        } else {
          clearInterval(timer);
          this.codeBtnText = '获取验证码';
        }
      }, 1000);
    },
    submitForm() {
      if (this.code === '123456') {
        // 调用接口获取所有id的key
        // 假设调用接口成功后返回的数据格式为{ 1: '123456', 2: 'abcdefg' }
        const keyData = { 1: '123456', 2: 'abcdefg' };
        // 更新items中的数据
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].key = keyData[this.items[i].id];
        }
        this.dialogVisible = false;
      } else {
        console.log('验证码错误');
      }
    },
  },
};
</script>

<style scoped>
/* 蒙层样式 */
.el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.5);
}

/* 弹窗样式 */
.el-dialog {
  width: 400px;
  border-radius: 4px;
}

/* 弹窗头部样式 */
.el-dialog__header {
  padding: 10px 20px;
  background-color: #409EFF;
  color: #fff;
  border-radius: 4px 4px 0 0;
}

/* 弹窗内容样式 */
.dialog-content {
  padding: 20px;
}

/* 弹窗底部样式 */
.dialog-footer {
  padding: 10px 20px;
  text-align: right;
  background-color: #F0F0F0;
  border-radius: 0 0 4px 4px;
}

/* 验证码按钮样式 */
.code-btn {
  width: 100px;
}

/* 输入框和按钮样式 */
.input-with-btn {
  width: calc(100% - 120px);
  margin-right: 20px;
}

</style>

