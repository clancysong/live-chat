<template>
  <div class="admin">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu class="menu" :default-active="activedItem" :router="true">
          <el-menu-item index="groups">公共群组管理</el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { Route } from 'vue-router'
import GroupManager from '@/components/GroupManager.vue'

@Component({ components: { GroupManager } })
export default class Admin extends Vue {
  @State('currentView') private currentView: Route

  private get activedItem() {
    const { name, params } = this.currentView

    return name
  }
}
</script>

<style lang="scss">
.admin {
  .menu {
    height: 100%;
    background: transparent;
    padding-top: 60px;

    .el-menu-item {
      color: #4f545c;
      font-weight: 600;
    }

    .el-menu-item:hover,
    .el-menu-item.is-active {
      background-color: rgb(238, 241, 246);
    }
  }
}
</style>

