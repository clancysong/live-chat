<template>
  <div class="home">
    <Game/>
    <el-button @click="logout">注销</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'
import router from '@/router'
import Game from '@/components/Game.vue'

@Component({ components: { Game } })
export default class Home extends Vue {
  private beforeCreate() {
    axios.get('/api/v1/auth')
  }

  private logout() {
    const rs = axios.delete('/api/v1/logout')
    if (rs) router.push({ path: '/login' })
  }
}
</script>
