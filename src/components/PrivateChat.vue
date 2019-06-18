<template>
  <div class="private-chat">
    <div class="title-bar">
      <div class="user-name">
        <font-awesome-icon :icon="['fas', 'at']" size="lg"/>
        <span>{{ currentPrivateChat.userb_name }}</span>
      </div>

      <div class="btns">
        <el-tooltip content="视频通话" placement="bottom">
          <div class="btn" @click="connectToRtc">
            <font-awesome-icon :icon="['fas', 'video']" size="lg"/>
          </div>
        </el-tooltip>
        <el-tooltip content="加为好友" placement="bottom">
          <div class="btn">
            <font-awesome-icon :icon="['fas', 'user-plus']" size="lg"/>
          </div>
        </el-tooltip>
        <el-tooltip content="使用帮助" placement="bottom">
          <div class="btn">
            <font-awesome-icon :icon="['fas', 'question-circle']" size="lg"/>
          </div>
        </el-tooltip>
      </div>
    </div>

    <div class="content">
      <div class="chat-frame">
        <div class="messages">
          <div class="videos" v-show="this.pc">
            <video id="localVideo" autoplay></video>
            <video id="remoteVideo" autoplay></video>
          </div>

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

        <el-form class="chat-form" @submit.native.prevent="submit">
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
  @State('currentPrivateChat') private currentPrivateChat: any
  @State('peerConnection') private pc: RTCPeerConnection
  @Mutation('setPeerConnection') private setPeerConnection: (pc: RTCPeerConnection) => void

  private inputValue = ''

  private mounted() {
    this.$socket.on('OFFER', async ({ sender, chat, offer }: any) => {
      console.log('连接请求', { sender, chat, offer })

      this.$confirm(`${sender.name}发来视频通话请求，是否接通？`, '视频通话', {
        confirmButtonText: '接通',
        cancelButtonText: '拒绝'
      }).then(async () => {
        await this.$router.push(`/home/@me/${chat.uuid}`)

        const cb = async () => {
          this.pc.setRemoteDescription(new RTCSessionDescription(offer))
          const answer = await this.pc.createAnswer()

          this.pc.setLocalDescription(answer)

          this.$socket.emit('ANSWER', answer)
        }

        if (this.pc) {
          cb()
        } else {
          this.createVideoStream(cb)
        }
      })
    })

    this.$socket.on('ANSWER', async (answer: any) => {
      console.log('连接回应', answer)
      this.pc.setRemoteDescription(new RTCSessionDescription(answer))
    })
  }

  private createVideoStream(callback: () => void = () => {}) {
    const localVideo: any = document.getElementById('localVideo')
    const remoteVideo: any = document.getElementById('remoteVideo')

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          video: true,
          audio: false
        },
        (stream: MediaStream) => {
          if (localVideo) localVideo.srcObject = stream

          if (RTCPeerConnection) {
            this.setPeerConnection(
              new RTCPeerConnection({
                iceServers: [
                  {
                    urls: 'stun:173.194.202.127:19302'
                  }
                ]
              })
            )

            stream.getTracks().forEach(t => this.pc.addTrack(t, stream))

            this.pc.ontrack = e => {
              const [stream] = e.streams
              remoteVideo.srcObject = stream
            }

            callback()
          }
        },
        (error: MediaStreamError) => {
          console.log(error)
        }
      )
    }
  }

  private async connectToRtc() {
    const cb = async () => {
      const { userb_id } = this.currentPrivateChat
      const offer = await this.pc.createOffer()

      this.$socket.emit('OFFER', { receiver_id: userb_id, offer })
      this.pc.setLocalDescription(offer)
    }

    if (this.pc) {
      cb()
    } else {
      this.createVideoStream(cb)
    }
  }

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

        .videos {
          display: flex;
          padding: 20px 0;

          > video {
            width: 300px;
            height: 150px;
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
