<template>
  <div class="community">
    <div class="groups">
      <el-row>
        <el-col v-for="group in groups" :key="group.id" :span="8">
          <div class="card">
            <div class="bg">
              <img class="cover" :src="group.cover" alt>
              <div class="fade"></div>
            </div>
            <div class="info">
              <img class="icon" :src="group.icon" alt>
              <div class="right">
                <h3 class="name">{{ group.name }}</h3>
                <div class="online-number">
                  <span class="dot"></span>
                  {{ group.online_number }}人在线
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Community extends Vue {
  private get groups() {
    return Array.from({ length: 9 }, (_, i) => i + 1).map(i => ({
      name: `群组${i}`,
      creator_id: 1,
      type: 'public',
      cover: 'https://cdn.discordapp.com/splashes/417739215355510784/e9dadb8eaa33c25e4a183d10ebe11f1c.jpg?size=1024',
      icon: 'https://cdn.discordapp.com/icons/417739215355510784/a839bc2da2b368f704b1001ed2662b74.png',
      online_number: 1024
    }))
  }
}
</script>

<style lang="scss">
.community {
  width: 100%;
  padding: 40px 100px;

  .groups {
    .card {
      margin: 8px;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: flex-end;
      overflow: hidden;
      position: relative;
      transition: all 0.2s ease-out;

      .bg {
        z-index: -10;

        .cover {
          width: 100%;
          object-fit: cover;
          transition: all 0.2s ease-out;
        }

        .fade {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, transparent 30%, #000);
          transition: all 0.3s ease-out;
        }
      }

      .info {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 16px;
        display: flex;

        .icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }

        .right {
          text-align: start;
          margin-left: 10px;

          .name {
            color: #ffffff;
            font-size: 18px;
            font-weight: 500;
            line-height: 1.2;
            margin-bottom: 2px;
          }

          .online-number {
            color: #b9bbbe;
            font-size: 14px;
            font-weight: 600;
            line-height: 1.3;
            position: relative;
            display: flex;
            align-items: center;

            .dot {
              content: '';
              display: block;
              background-color: #43b581;
              border-radius: 50%;
              flex-shrink: 0;
              height: 8px;
              margin-right: 4px;
              width: 8px;
            }
          }
        }
      }
    }

    .card:hover {
      box-shadow: 0 9px 20 rgba(0, 0, 0, 0.2);

      .cover {
        transform: scale(1.01);
      }

      .fade {
        opacity: 0.8;
      }
    }
  }
}
</style>
