<template>
  <div class="side-nav">
    <el-menu
      default-active="home"
      class="menu"
      background-color="#202224"
      text-color="#fff"
      :collapse="true"
      :router="true"
    >
      <el-menu-item index="home" route="/">
        <font-awesome-icon :icon="['fas', 'home']" size="lg"/>
        <span slot="title">home</span>
      </el-menu-item>

      <el-menu-item
        v-for="group in groups"
        :key="group.id"
        :index="`group-${group.id}`"
        :route="`/group/${group.id}`"
      >
        <font-awesome-icon :icon="['fas', 'meh-blank']" size="lg"/>
        <span slot="title">{{ group.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import Group from '@/models/Group'

@Component
export default class SideNav extends Vue {
  @State('groups') private groups: Group[]
}
</script>

<style lang="scss">
.side-nav {
  $side-nav-width: 70px;

  height: 100%;

  .menu {
    width: $side-nav-width;
    height: 100%;
    border: none;
    
    .el-menu-item {
      font-size: 20px;
    }
  }
}
</style>


