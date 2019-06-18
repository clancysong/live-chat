<template>
  <div class="home-menu">
    <header class="title-bar">
      <h3>
        <font-awesome-icon :icon="['fas', 'home']" size="lg"/>
      </h3>
    </header>

    <el-menu
      :default-active="activedItem"
      class="menu"
      background-color="#2F3135"
      text-color="#fff"
      :router="true"
    >
      <el-menu-item index="community" route="/home/community">
        <div class="inner">
          <font-awesome-icon :icon="['fas', 'compass']" size="lg"/>
          <span slot="title">社区</span>
        </div>
      </el-menu-item>

      <el-menu-item index="friends" route="/home/friends">
        <div class="inner">
          <font-awesome-icon :icon="['fas', 'user-friends']" size="lg"/>
          <span slot="title">好友</span>
        </div>
      </el-menu-item>

      <el-menu-item index="profile" route="/home/profile">
        <div class="inner">
          <font-awesome-icon :icon="['fas', 'user-circle']" size="lg"/>
          <span slot="title">个人信息</span>
        </div>
      </el-menu-item>

      <h3>私信</h3>

      <el-menu-item
        v-for="chat in privateChats"
        :key="chat.uuid"
        :index="`@me-${chat.uuid}`"
        :route="`/home/@me/${chat.uuid}`"
      >
        <div class="inner">
          <font-awesome-icon :icon="['fas', 'user']" size="lg"/>
          <span slot="title">{{ chat.userb_name }}</span>
        </div>
      </el-menu-item>
    </el-menu>

    <footer class="footer">
      <div class="user-info">
        <div class="avatar">
          <font-awesome-icon :icon="['fas', 'bomb']" size="lg"/>
        </div>
        <div class="info">
          <div class="name">{{ user.name }}</div>
          <div class="code">#4241</div>
        </div>
      </div>

      <div class="btns">
        <div class="btn">
          <font-awesome-icon :icon="['fas', 'cog']" size="lg"/>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { Route } from 'vue-router'
import User from '@/models/User'

@Component
export default class HomeMenu extends Vue {
  @State('currentView') private currentView: Route
  @State('user') private user: User
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
  display: flex;
  flex-direction: column;

  .title-bar {
    height: 48px;
    line-height: 48px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 0 rgba(0, 0, 0, 0.06);

    > h3 {
      color: #fff;
    }
  }

  .menu {
    border: none;
    margin-top: 20px;
    font-weight: 500;
    flex: auto;

    .el-menu-item {
      height: 48px;
      margin: 1px 0;

      .inner {
        margin: 0 -12px;
        color: #8e9297;
        height: 100%;
        font-weight: 600;
        font-size: 15px;
        padding: 8px;
        border-radius: 3px;
        display: flex;
        align-items: center;

        svg {
          width: 20px;
          height: 20px;
          margin-right: 18px;
        }
      }
    }

    .el-menu-item:hover {
      background: #2f3134 !important;

      .inner {
        background: #292b2f;
        transition: all 0.3s;

        span {
          color: #ffffff;
        }
      }
    }

    .el-menu-item.is-active {
      .inner {
        background-color: rgba(79, 84, 92, 0.6);
        transition: all 0.2s ease-out;

        span {
          color: #ffffff;
        }
      }
    }

    > h3 {
      font-size: 13px;
      line-height: 16px;
      font-weight: 600;
      color: #8e9297;
      margin: 20px 0 8px 20px;
      text-align: start;
    }
  }

  > .footer {
    background: rgba(32, 34, 37, 0.3);
    height: 52px;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    padding: 0 10px;
    margin-bottom: 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-info {
      display: flex;
      align-items: center;

      .avatar {
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 100%;
        background: #f04747;
        color: #ffffff;
        font-size: 12px;
        text-align: center;
      }

      .name {
        font-size: 14px;
        font-weight: 500;
        margin: 0 8px;
      }

      .code {
        color: #72767d;
        font-size: 12px;
      }
    }

    .btns {
      .btn {
        color: #b9bbbe;
        cursor: pointer;
      }
    }
  }
}
</style>


