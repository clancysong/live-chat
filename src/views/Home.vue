<template>
  <div class="home">
    <el-button @click="sendMessage">发送</el-button>
    <el-button @click="logout">注销</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import io from '@/utils/socket'
import axios from 'axios'
import router from '@/router'

@Component
export default class Home extends Vue {
  private beforeCreate() {
    // axios.get('/api/v1/auth')
  }

  private sendMessage() {
    io.emit('test', 'hello')
  }

  private logout() {
    const rs = axios.delete('/api/v1/logout')
    if (rs) router.push({ path: '/login' })
  }
}
</script>
