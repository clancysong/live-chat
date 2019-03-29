<template>
  <div class="chat-frame">
    <div class="title-bar"></div>

    <div class="content">
      <div class="chat-frame">
        <div class="messages">
          <div class="message">
            <div class="left">
              <img class="avatar">
            </div>
            <div class="right">
              <ul class="messages-list">
                <li v-for="message in currentGroup.messages" :key="message.id">
                  <h4 class="name">{{ message.creator_name }}</h4>
                  <p class="date">{{ message.created_at }}</p>
                  <p class="content">{{ message.content }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <el-input v-model="inputValue"/>
        <el-button @click="submit">发送</el-button>
      </div>

      <div class="members">
        <div class="online">
          <h2>在线 - {{ onlineMembers.length }}人</h2>

          <ul class="members-list">
            <li v-for="member in onlineMembers" :key="member.id">{{ member.name }}</li>
          </ul>

          <h2>离线 - {{ offlineMembers.length }}人</h2>

          <ul class="members-list">
            <li v-for="member in offlineMembers" :key="member.id">{{ member.name }}</li>
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

@Component
export default class GroupChat extends Vue {
  @Prop(Number) private readonly id: number
  @State('currentGroup') private currentGroup: Group

  private inputValue = ''

  private get members() {
    if (this.currentGroup) return this.currentGroup.members
    else return []
  }

  private get onlineMembers() {
    return this.members.filter(member => member.online)
  }

  private get offlineMembers() {
    return this.members.filter(member => !member.online)
  }

  constructor() {
    super()
    io.on('user comes online', (id: number) => {
      console.log('用户上线：', id)
    })
  }

  private created() {
    io.emit('connect to group', this.currentGroup)
  }

  private updated() {
    io.emit('connect to group', this.currentGroup)
  }

  private submit() {
    io.emit('send message', this.inputValue)
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

        .messages-list {
          list-style: none;
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

      .members-list {
        list-style: none;
      }
    }
  }
}
</style>
