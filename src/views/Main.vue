<template>
  <div class="main">
    <side-nav/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import SideNav from '@/components/SideNav.vue'

@Component({ components: { SideNav } })
export default class Main extends Vue {}
</script>

<style lang="scss">
.main {
  height: 100vh;
  display: flex;
  font-family: Whitney, 'Microsoft YaHei New', 微软雅黑, 'Microsoft Yahei', 'Microsoft JhengHei', 宋体, SimSun,
    'Helvetica Neue', Helvetica, Arial, sans-serif;
}
</style>