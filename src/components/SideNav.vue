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
      <el-menu-item index="home" route="/home">
        <div class="avatar">
          <div class="inner">
            <div>
              <font-awesome-icon :icon="['fas', 'bomb']" size="lg"/>
            </div>
          </div>
        </div>
        <span slot="title">home</span>
      </el-menu-item>

      <el-divider></el-divider>

      <el-menu-item
        v-for="group in groups"
        :key="group.uuid"
        :index="`groups-${group.uuid}`"
        :route="`/groups/${group.uuid}`"
      >
        <div class="avatar">
          <div class="inner">
            <img v-if="group.avatar" :src="group.avatar">
            <div v-else>{{ group.name.slice(0, 1) }}</div>
          </div>
        </div>
        <span slot="title">{{ group.name }}</span>
      </el-menu-item>

      <div class="add-group-btn" @click="addGroupDialogVisible =  true">
        <font-awesome-icon :icon="['fas', 'plus']" size="lg"/>
      </div>
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

    if (name === 'groups' && params.uuid) {
      return `${name}-${params.uuid}`
    } else {
      return 'home'
    }
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
    padding: 8px 0;

    .el-menu-item {
      font-size: 20px;
      height: 60px;

      .el-tooltip {
        padding: 0 !important;
      }

      .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        .inner {
          font-weight: 900;
          width: 48px;
          height: 48px;
          line-height: 48px;
          border-radius: 50%;
          color: #b9bbbe;
          background-color: #2f3136;
          font-size: 18px;
          overflow: hidden;

          > img {
            width: 48px;
            height: 48px;
            object-fit: cover;
          }
        }
      }
    }

    .el-menu-item.is-active,
    .el-menu-item:hover {
      .avatar {
        .inner {
          border-radius: 26%;
          transition: all 0.15s ease-out;

          > div {
            color: #fff;
            background-color: #7289da;
          }
        }
      }
    }

    .el-divider {
      width: 32px;
      height: 2px;
      margin: 12px auto;
      border-radius: 1px;
      background: #2f3136;
    }

    .add-group-btn {
      background: transparent;
      border: none;
      outline: none;
      font-weight: 500;
      width: 48px;
      height: 48px;
      line-height: 48px;
      border-radius: 50%;
      color: #b9bbbe;
      background-color: #2f3136;
      color: #43b581;
      font-size: 18px;
      margin: 6px auto;
    }

    .add-group-btn:hover {
      cursor: pointer;
      color: #fff;
      background-color: #43b581;
      border-radius: 26%;
      transition: all 0.15s ease-out, color 0.15s ease-out;
    }
  }
}
</style>


