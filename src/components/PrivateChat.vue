<template>
  <div class="private-chat">
    <div class="title-bar">
      <div class="user-name">
        <font-awesome-icon :icon="['fas', 'at']" size="lg"/>
        <span>{{ currentPrivateChat.userb_name }}</span>
      </div>

      <div class="btns">
        <div class="btn">
          <font-awesome-icon :icon="['fas', 'video']" size="lg"/>
        </div>
        <div class="btn">
          <font-awesome-icon :icon="['fas', 'headphones']" size="lg"/>
        </div>
        <div class="btn">
          <font-awesome-icon :icon="['fas', 'user-plus']" size="lg"/>
        </div><div class="btn">
          <font-awesome-icon :icon="['fas', 'question-circle']" size="lg"/>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="chat-frame">
        <div class="messages">
          <ul class="messages-list">
            <li v-for="message in currentPrivateChat.messages" :key="message.id">
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

        <el-form class="chat-form">
          <el-input v-model="inputValue" placeholder="输入文字以发送消息">
            <el-button slot="append" @click="submit">
              <font-awesome-icon :icon="['fas', 'paper-plane']" size="lg"/>
            </el-button>
          </el-input>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Action, State, Getter, Mutation } from 'vuex-class'
import Group from '@/models/Group'
import Message from '@/models/Message'

@Component
export default class PrivateChat extends Vue {
  @Prop(Number) private readonly id: number
  @State('currentPrivateChat') private currentPrivateChat: Group

  private inputValue = ''

  private submit() {
    if (this.inputValue) {
      this.$socket.emit('MESSAGE_SEND', this.inputValue)
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss">
.private-chat {
  height: 100%;
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

    .user-name {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 600;
      text-align: start;
      color: #23262a;

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
  }
}
</style>
