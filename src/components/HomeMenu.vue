<template>
  <div class="home-menu">
    <div class="title-bar"></div>

    <el-menu
      :default-active="activedItem"
      class="menu"
      background-color="#2F3135"
      text-color="#fff"
      :router="true"
    >
      <el-menu-item index="community" route="/home/community">
        <font-awesome-icon :icon="['fas', 'burn']" size="lg"/>
        <span slot="title">社区</span>
      </el-menu-item>

      <el-menu-item index="friends" route="/home/friends">
        <font-awesome-icon :icon="['fas', 'burn']" size="lg"/>
        <span slot="title">好友</span>
      </el-menu-item>

      <el-menu-item index="profile" route="/home/profile">
        <font-awesome-icon :icon="['fas', 'burn']" size="lg"/>
        <span slot="title">个人信息</span>
      </el-menu-item>

      <el-menu-item
        v-for="chat in privateChats"
        :key="chat.uuid"
        :index="`@me-${chat.uuid}`"
        :route="`/@me/${chat.uuid}`"
      >
        <font-awesome-icon :icon="['fas', 'burn']" size="lg"/>
        <span slot="title">{{ chat.userb_name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { Route } from 'vue-router'

@Component
export default class HomeMenu extends Vue {
  @State('currentView') private currentView: Route
  @State('privateChats') private privateChats: []

  private get activedItem() {
    const { name, params } = this.currentView

    return `${name}${params.uuid ? `-${params.uuid}` : ''}`
  }
}
</script>

<style lang="scss">
.home-menu {
  background: #2f3135;
  flex: 0 0 240px;
  height: 100%;

  .title-bar {
    height: 48px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 0 rgba(0, 0, 0, 0.06);

    > h4 {
      color: #fff;
    }
  }

  .menu {
    border: none;
    margin-top: 16px;
    font-weight: 500;
  }
}
</style>


