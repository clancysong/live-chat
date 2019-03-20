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
              <h4 class="name">cicec</h4>
              <p class="date">2019年1月13日</p>
              <p class="content">哈哈</p>
            </div>
          </div>
        </div>

        <el-input v-model="inputValue"/>
        <el-button @click="submit">发送</el-button>
      </div>

      <div class="members">
        <div class="online">
          <h2>在线 - 2人</h2>
          <ul>
            <li>
              <img src alt>
              <h4>user1</h4>
            </li>
            <li>
              <img src alt>
              <h4>user2</h4>
            </li>
          </ul>
        </div>

        <div class="offline">
          <h2>离线 - 1人</h2>
          <ul>
            <li>
              <img src alt>
              <h4>user3</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import io from '@/utils/socket'

@Component
export default class GroupChat extends Vue {
  @Prop(Number) readonly id: number

  private inputValue = ''

  private created() {
    console.log(this.id)
  }

  private submit() {
    io.emit('test', this.inputValue)
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
      }

      .chat-form {
        height: 95px;
      }
    }

    > .members {
      flex: 0 0 240px;
      height: 100%;
      background: #f3f3f3;
    }
  }
}
</style>
