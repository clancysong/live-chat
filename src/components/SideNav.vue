<template>
  <div class="side-nav">
    <el-menu
      default-active="0"
      class="menu"
      background-color="#202224"
      text-color="#fff"
      :collapse="true"
    >
      <el-menu-item index="0">
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'grin-alt']" size="lg"/>
          <span slot="title">home</span>
        </router-link>
      </el-menu-item>

      <el-menu-item v-for="group in groups" :key="group.id" :index="group.id.toString()">
        <router-link :to="`/groups/${group.id}`">
          <font-awesome-icon :icon="['fas', 'grin-alt']" size="lg"/>
          <span slot="title">{{ group.name }}</span>
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import List from '@/utils/List'

@Component
export default class SideNav extends Vue {
  @Action('fetchGroups') private fetchGroupsAction: () => void
  @State('groups') private groupsState: List

  get groups() {
    return this.groupsState.getAll()
  }

  private created() {
    this.fetchGroupsAction()
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
  }
}
</style>


