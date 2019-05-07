<template>
  <div class="side-nav">
    <el-menu
      :default-active="activedItem"
      class="menu"
      background-color="#202224"
      text-color="#fff"
      :collapse="true"
      :router="true"
    >
      <el-menu-item index="home" route="/community">
        <font-awesome-icon :icon="['fas', 'burn']" size="lg"/>
        <span slot="title">home</span>
      </el-menu-item>

      <el-menu-item
        v-for="group in groups"
        :key="group.uuid"
        :index="`groups-${group.uuid}`"
        :route="`/groups/${group.uuid}`"
      >
        <font-awesome-icon :icon="['fas', 'circle']" size="lg"/>
        <span slot="title">{{ group.name }}</span>
      </el-menu-item>

      <el-button @click="addGroupDialogVisible =  true">
        <font-awesome-icon :icon="['fas', 'plus']" size="lg"/>
      </el-button>
    </el-menu>

    <el-dialog
      width="540px"
      :show-close="false"
      :center="true"
      :visible.sync="addGroupDialogVisible"
    >
      <new-group/>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { Route } from 'vue-router'
import NewGroup from './NewGroup.vue'
import Group from '@/models/Group'

@Component({ components: { NewGroup } })
export default class SideNav extends Vue {
  @State('currentView') private currentView: Route
  @State('joinedGroups') private groups: Group[]

  private addGroupDialogVisible: boolean = false

  private get activedItem() {
    const { name, params } = this.currentView

    return `${name}-${params.uuid ? params.uuid : ''}`
  }
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


