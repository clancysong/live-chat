<template>
  <div class="chat-frame">
    <div class="title-bar"></div>

    <div class="content">
      <div class="chat-frame">
        <div class="messages">
          <ul class="messages-list">
            <li v-for="message in currentGroup.messages" :key="message.id">
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

        <el-input v-model="inputValue"/>
        <el-button @click="submit">发送</el-button>
      </div>

      <div class="members">
        <div class="online">
          <div class="title">在线 - {{ onlineMembers.length }}人</div>

          <ul class="members-list">
            <li v-for="member in onlineMembers" :key="member.id">
              <div class="avatar">
                <font-awesome-icon :icon="['fas', 'bomb']" size="lg"/>
              </div>
              <div class="name">{{ member.name }}</div>
            </li>
          </ul>

          <div class="title">离线 - {{ offlineMembers.length }}人</div>

          <ul class="members-list">
            <li v-for="member in offlineMembers" :key="member.id">
              <div class="avatar">
                <font-awesome-icon :icon="['fas', 'bomb']" size="lg"/>
              </div>
              <div class="name">{{ member.name }}</div>
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
import io from '@/utils/socket'
import Group from '@/models/Group'
import Message from '@/models/Message'

@Component
export default class GroupChat extends Vue {
  @Prop(Number) private readonly id: number
  @State('currentGroup') private currentGroup: Group
  @Mutation('addMessage') private addMessage: (message: Message) => void
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

  constructor() {
    super()
    io.on('receive message', (message: Message) => {
      console.log('接收到消息：', message)
      this.addMessage(message)
    })
  }

  private created() {
    io.emit('join', this.currentGroup.id)
  }

  private updated() {
    io.emit('join', this.currentGroup.id)
  }

  private submit() {
    io.emit('send message', this.inputValue)
    this.inputValue = ''
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
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
  }

  > .content {
    height: 100%;
    padding-top: 48px;
    display: flex;

    > .chat-frame {
      flex: 1;
      display: flex;
      flex-direction: column;

      .messages {
        flex: 1;
        overflow: scroll;
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
</style>
