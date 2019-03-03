<template>
  <div class="side-nav">
    <el-menu
      default-active="1"
      class="menu"
      background-color="#202224"
      text-color="#fff"
      :collapse="true"
    >
      <el-menu-item index="1">
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'grin-alt']" size="lg"/>
          <span slot="title">home</span>
        </router-link>
      </el-menu-item>

      <el-menu-item index="2">
        <router-link to="/groups/1">
          <font-awesome-icon :icon="['fas', 'grin-alt']" size="lg"/>
          <span slot="title">导航二</span>
        </router-link>
      </el-menu-item>

      <el-menu-item index="3">
        <router-link to="/groups/2">
          <font-awesome-icon :icon="['fas', 'grin-alt']" size="lg"/>
          <span slot="title">导航三</span>
        </router-link>
      </el-menu-item>
      
      <el-menu-item index="4">
        <router-link to="/groups/3">
          <font-awesome-icon :icon="['fas', 'grin-alt']" size="lg"/>
          <span slot="title">导航四</span>
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class SideNav extends Vue {}
</script>

<style lang="scss">
.side-nav {
  $side-nav-width: 70px;

  width: $side-nav-width;
  height: 100%;

  .menu {
    height: 100%;
  }
}
</style>


