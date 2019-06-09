<template>
  <div class="user-info">
    <div class="name">
      <h4>用户名</h4>
      <span>{{ user.name }}</span>
    </div>
    <div class="name">
      <h4>邮箱</h4>
      <span>{{ user.email }}</span>
    </div>

    <el-button @click="handleEdit">编辑</el-button>

    <el-dialog
      title="编辑个人信息"
      :visible.sync="editdialogVisible"
      :modal-append-to-body="false"
      width="30%"
    >
      <el-form :model="formData">
        <el-form-item label="用户名">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditorSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { Route } from 'vue-router'
import User from '@/models/User'

@Component
export default class UserInfo extends Vue {
  @State('user') private user: User
  @Action('updateUserInfo') private updateUserInfo: (data: any) => void

  private editdialogVisible = false
  private formData: any = {}

  private handleEdit() {
    const { name, email } = this.user

    this.formData = { ...this.formData, name, email }
    this.editdialogVisible = true
  }

  private async handleEditorSubmit() {
    const { name, email } = this.formData

    if (name || email) {
      const loading = this.$loading({
        text: '正在更新信息'
      })
      const data = new FormData()

      if (name) data.append('name', name)
      if (email) data.append('email', email)

      await this.updateUserInfo(data)

      loading.close()
      this.editdialogVisible = false
    }
  }
}
</script>

<style lang="scss">
.user-info {
  width: 100%;
}
</style>


