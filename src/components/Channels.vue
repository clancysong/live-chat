<template>
  <div class="channels">
    <div class="title-bar">
      <h4>{{ currentGroup.name }}</h4>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <font-awesome-icon :icon="['fas', 'angle-down']" size="lg"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="invite">
            <font-awesome-icon :icon="['fas', 'user-plus']" size="lg"/>&nbsp;&nbsp;邀请其他人
          </el-dropdown-item>
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="channel-list">
      <h3>频道</h3>

      <ul>
        <li class="channel">
          <div class="inner">
            <div class="name">
              <font-awesome-icon :icon="['fab', 'slack-hash']" size="lg"/>
              <span>general</span>
            </div>

            <div class="btns">
              <div class="btn">
                <font-awesome-icon :icon="['fas', 'user-plus']" size="lg"/>
              </div>
              <div class="btn">
                <font-awesome-icon :icon="['fas', 'cog']" size="lg"/>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <footer class="footer">
      <div class="user-info">
        <div class="avatar">
          <font-awesome-icon :icon="['fas', 'bomb']" size="lg"/>
        </div>
        <div class="info">
          <div class="name">cicec</div>
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
import { State } from 'vuex-class'
import Group from '@/models/Group'

@Component
export default class Channels extends Vue {
  @State('user') private userState: {}
  @State('currentGroup') private currentGroup: Group

  private handleCommand(command: string) {
    switch (command) {
      case 'invite': {
        const code = this.generateInvitationCode()
      }
    }
  }

  private generateInvitationCode() {
    return 'E4RG'
  }
}
</script>

<style lang="scss">
.channels {
  background: #2f3135;
  flex: 0 0 240px;
  height: 100%;
  display: flex;
  flex-direction: column;

  > .title-bar {
    height: 48px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 0 rgba(0, 0, 0, 0.06);
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > h4 {
      color: #fff;
      margin: 0;
    }

    .el-dropdown-link {
      cursor: pointer;
    }
  }

  > .channel-list {
    flex: auto;

    > h3 {
      font-size: 13px;
      line-height: 16px;
      font-weight: 600;
      color: #8e9297;
      margin: 20px 0 20px 20px;
      text-align: start;
    }

    > ul {
      list-style: none;
      padding: 0;

      > li {
        .inner {
          height: 40px;
          line-height: 40px;
          padding: 0 8px;
          margin: 1px 8px;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          background-color: #40444b;
          color: #ffffff;

          .name {
            font-size: 16px;
            font-weight: 600;

            svg {
              color: #72767d;
              margin-right: 8px;
            }
          }

          .btns {
            display: flex;

            .btn {
              margin: 0 4px;

              svg {
                color: #b9bbbe;
                width: 16px;
                height: 16px;
                cursor: pointer;
              }
            }
          }
        }
      }
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
