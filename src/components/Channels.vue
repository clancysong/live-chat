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
      <div class="title">
        <h3>频道</h3>

        <el-tooltip class="item" content="新建频道" placement="top">
          <div class="add-channel" @click="createChannel">
            <font-awesome-icon :icon="['fas', 'plus']" size="lg"/>
          </div>
        </el-tooltip>
      </div>

      <el-menu
        :default-active="activedItem"
        class="menu"
        background-color="#2F3135"
        text-color="#fff"
      >
        <el-menu-item
          v-for="channel in currentGroup.channels"
          :key="channel.uuid"
          :index="`channel-${channel.uuid}`"
          @click="changeChannel(channel)"
        >
          <div class="inner">
            <div class="name">
              <font-awesome-icon :icon="['fab', 'slack-hash']" size="lg"/>
              <span slot="title">{{ channel.name }}</span>
            </div>

            <div class="btns">
              <div class="btn">
                <font-awesome-icon :icon="['fas', 'cog']" size="lg"/>
              </div>
              <div class="btn" @click="removeChannel(channel)">
                <font-awesome-icon :icon="['fas', 'trash']" size="lg"/>
              </div>
            </div>
          </div>
        </el-menu-item>
      </el-menu>
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
import { State, Action, Mutation } from 'vuex-class'
import Group from '@/models/Group'
import Channel from '@/models/Channel'

@Component
export default class Channels extends Vue {
  @State('user') private userState: {}
  @State('currentGroup') private currentGroup: Group
  @State('currentChannel') private currentChannel: Group
  @Action('fetchChannelInfo') private fetchChannelInfo: (uuid: string) => void
  @Action('createChannel') private createChannelAction: (payload: { groupId: number; channelInfo: {} }) => void
  @Action('removeChannel') private removeChannelAction: (id: number) => void

  private get activedItem() {
    const { uuid } = this.currentChannel

    return `channel-${uuid}`
  }

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

  private async changeChannel(channel: Channel) {
    await this.fetchChannelInfo(channel.uuid)

    this.$socket.emit('CHAT_CONNECT', { chatType: 'group', chatUuid: channel.uuid })
  }

  private createChannel() {
    const { id } = this.currentGroup

    this.$prompt('请输入频道名称').then((rs: any) =>
      this.createChannelAction({ groupId: id, channelInfo: { name: rs.value } })
    )
  }

  private removeChannel(channel: Channel) {
    this.$confirm('删除频道后所有的消息记录都会被删除，确定吗？').then(() => {
      this.removeChannelAction(channel.id)
    })
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

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 20px 10px;

      > h3 {
        font-size: 13px;
        line-height: 16px;
        font-weight: 600;
        color: #8e9297;
        text-align: start;
      }

      .add-channel {
        font-size: 12px;
        cursor: pointer;
      }
    }

    .menu {
      border: none;
      font-weight: 500;
      flex: auto;

      .el-menu-item {
        height: 40px;
        margin: 1px 0;

        .inner {
          height: 100%;
          padding: 0 8px;
          margin: 0 -12px;
          border-radius: 4px;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .name {
            font-size: 16px;
            font-weight: 600;

            svg {
              color: #72767d;
              margin-right: 8px;
            }
          }

          .btns {
            display: none;

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

      .el-menu-item:hover {
        background: #2f3134 !important;

        .inner {
          background: #292b2f;
          transition: all 0.2s ease-out;

          span {
            color: #ffffff;
          }

          .btns {
            display: flex;
          }
        }
      }

      .el-menu-item.is-active {
        .inner {
          background-color: #40444b;
          transition: all 0.2s ease-out;

          span {
            color: #ffffff;
          }

          .btns {
            display: flex;
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
