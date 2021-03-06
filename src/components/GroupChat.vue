<template>
  <div class="chat-frame">
    <div class="title-bar">
      <div class="channel-name">
        <font-awesome-icon :icon="['fab', 'slack-hash']" size="lg"/>
        <span>general</span>
      </div>

      <div class="btns">
        <div class="btn">
          <font-awesome-icon :icon="['fas', 'users']" size="lg"/>
        </div>
        <div class="btn">
          <font-awesome-icon :icon="['fas', 'question-circle']" size="lg"/>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="chat-frame">
        <div class="messages">
          <ul class="messages-list">
            <li v-for="message in currentChannel.messages" :key="message.id">
              <div class="left">
                <div class="avatar">
                  <font-awesome-icon :icon="['fas', 'bomb']" size="lg"/>
                </div>
              </div>
              <div class="right">
                <span class="name">{{ message.creator_name }}</span>
                <span class="date">{{ new Date(message.created_at).toLocaleString() }}</span>
                <span class="content">{{ message.content }}</span>
              </div>
            </li>
          </ul>
        </div>

        <el-form class="chat-form" @submit.native.prevent="submit">
          <el-input v-model="inputValue" placeholder="输入文字以发送消息">
            <el-button slot="append" @click="submit">
              <font-awesome-icon :icon="['fas', 'paper-plane']" size="lg"/>
            </el-button>
          </el-input>
        </el-form>
      </div>

      <div class="members">
        <div class="online">
          <div class="title">在线 - {{ onlineMembers.length }}人</div>

          <ul class="members-list">
            <li v-for="member in onlineMembers" :key="member.id">
              <el-dropdown trigger="click" placement="bottom" @command="handleCommand">
                <div>
                  <div class="avatar">
                    <font-awesome-icon :icon="['fas', 'bomb']" size="lg"/>
                  </div>
                  <div class="name">{{ member.name }}</div>
                </div>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :command="{ type: 'ADD_FRIEND', payload: { userId: member.id } }"
                  >添加好友</el-dropdown-item>
                  <el-dropdown-item
                    :command="{ type: 'PRIVATE_CHAT', payload: { userId: member.id } }"
                  >私信</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>

          <div class="title">离线 - {{ offlineMembers.length }}人</div>

          <ul class="members-list">
            <li v-for="member in offlineMembers" :key="member.id">
              <el-dropdown trigger="click" placement="bottom" @command="handleCommand">
                <div>
                  <div class="avatar">
                    <font-awesome-icon :icon="['fas', 'bomb']" size="lg"/>
                  </div>
                  <div class="name">{{ member.name }}</div>
                </div>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :command="{ type: 'ADD_FRIEND', payload: { userId: member.id } }"
                  >添加好友</el-dropdown-item>
                  <el-dropdown-item
                    :command="{ type: 'PRIVATE_CHAT', payload: { userId: member.id } }"
                  >私信</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Action, State, Getter, Mutation } from 'vuex-class'
import Group from '@/models/Group'
import Message from '@/models/Message'
import User from '@/models/User'

@Component
export default class GroupChat extends Vue {
  @Prop(Number) private readonly id: number
  @State('user') private user: User
  @State('currentGroup') private currentGroup: Group
  @State('currentChannel') private currentChannel: Group
  @Action('sendFriendRequest') private sendFriendRequest: (request: { receiver_id: number }) => any
  @Action('createPrivateChat') private createPrivateChat: (data: { receiver_id: number }) => any

  private inputValue = ''

  private get members() {
    if (this.currentGroup) return this.currentGroup.members
    else return []
  }

  private get onlineMembers() {
    return this.members.filter(member => member.status === 'online')
  }

  private get offlineMembers() {
    return this.members.filter(member => member.status === 'offline')
  }

  private submit() {
    if (this.inputValue) {
      this.$socket.emit('MESSAGE_SEND', this.inputValue)
      this.inputValue = ''
    }
  }

  private async handleCommand(command: any) {
    const { type, payload } = command

    switch (type) {
      case 'ADD_FRIEND': {
        this.$confirm('这将向对方发送好友请求，确定吗？').then(async () => {
          const { code } = await this.sendFriendRequest({ receiver_id: payload.userId })

          if (code === 100) this.$message.success('已发送好友请求')
          else if (code === 102) this.$message.warning('您已经发送过好友请求了，请等待对方审核')
          else if (code === 103) this.$message.warning('对方已经是您的好友了，无需重复添加')
        })

        break
      }

      case 'PRIVATE_CHAT': {
        const { data } = await this.createPrivateChat({ receiver_id: payload.userId })
        this.$router.push({ path: `/home/@me/${data.uuid}` })
        break
      }

      default: {
        break
      }
    }
  }
}
</script>

<style lang="scss">
.chat-frame {
  width: 100%;
  position: relative;

  > .title-bar {
    height: 48px;
    box-shadow: 0 1px 0 #dcddde, 0 2px 0 rgba(236, 238, 239, 0.25);
    color: #4f545c;
    background: #fff;
    padding: 0 20px;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .channel-name {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 600;
      text-align: start;

      svg {
        color: #72767d;
        margin-right: 8px;
      }
    }

    .btns {
      display: flex;

      .btn {
        margin: 0 10px;
        cursor: pointer;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  > .content {
    height: 100%;
    padding-top: 48px;
    display: flex;

    > .chat-frame {
      flex: 1;
      display: flex;
      flex-direction: column;

      .messages::-webkit-scrollbar {
        display: none;
      }

      .messages {
        flex: 1;
        overflow-y: scroll;
        direction: ltr;

        .messages-list {
          list-style: none;
          padding: 0;

          > li {
            display: flex;
            padding: 20px 0;

            .left {
              display: flex;
              align-items: center;
              padding: 0 20px;

              .avatar {
                width: 40px;
                height: 40px;
                line-height: 40px;
                border-radius: 100%;
                background: #f04747;
                color: #ffffff;
                font-size: 16px;
              }
            }

            .right {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              padding-right: 20px;

              .name {
                font-size: 16px;
                color: #43464a;
                margin-right: 6px;
                font-weight: 500;
              }

              .date {
                font-size: 12px;
                color: #99aab5;
                font-weight: 500;
              }

              .content {
                flex: 0 0 100%;
                font-size: 15px;
                color: #747f8d;
                text-align: start;
                margin-top: 6px;
                font-weight: 400;
              }
            }
          }
        }
      }

      .chat-form {
        height: 95px;
        margin: 0 20px;
        padding: 20px 0 30px;
        border-top: 1px solid rgba(0, 0, 0, 0.14);

        .el-input {
          input {
            height: 45px;
            background-color: #f6f6f7;
            border: none;
            padding: 0 20px;
          }

          .el-input-group__append {
            border: none;
          }

          button {
            border: none;
            outline: none;
          }
        }

        input::placeholder {
          font-weight: 600;
        }
      }
    }

    > .members {
      flex: 0 0 240px;
      height: 100%;
      background: #f3f3f3;
      padding: 20px;

      .title {
        text-align: start;
        color: #99aab5;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 6px;
        letter-spacing: 0.08em;
        overflow: hidden;
      }

      .members-list {
        list-style: none;
        padding: 0;

        > li {
          cursor: pointer;
          text-align: start;

          .el-dropdown {
            .el-dropdown-selfdefine {
              padding: 8px;
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
                color: #72767d;
                font-size: 16px;
                font-weight: 500;
                margin: 0 8px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
