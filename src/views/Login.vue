<template>
  <div class="login">
    <el-button type="primary" round @click="getUser">获取 id 为 1 的用户</el-button>
    <el-button type="primary" round @click="login">登录</el-button>
    <el-button type="primary" round @click="register">注册</el-button>
    <el-button type="primary" round @click="logout">注销</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Button } from 'element-ui'
import axios from 'axios'

@Component
export default class Login extends Vue {
  private URL = '/api/v1'

  private async getUser() {
    const res = await axios.get(`${this.URL}/user/1`, { withCredentials: true })
    console.log(res.data)
  }

  private async login() {
    const fd = new FormData()

    fd.append('username', 'user1')
    fd.append('password', 'uu')

    const res = await axios.post(`${this.URL}/auth/login`, fd)
    console.log(res.data)
  }

  private async register() {
    const fd = new FormData()

    fd.append('username', 'test15')
    fd.append('password', 'test')

    const res = await axios.post(`${this.URL}/auth/register`, fd)
    console.log(res.data)
  }

  private async logout() {
    const res = await axios.delete(`${this.URL}/auth/logout`)
    console.log(res.data)
  }
}
</script>
