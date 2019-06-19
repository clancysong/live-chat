<template>
  <div class="public-groups">
    <div class="groups">
      <div v-for="group in groups" :key="group.id" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <div class="card">
          <div class="bg">
            <img class="cover" :src="group.cover">
            <div class="fade"></div>
          </div>
          <div class="info">
            <img class="icon" :src="group.avatar">
            <div class="right">
              <h3 class="name">{{ group.name }}</h3>
              <!-- <div class="online-number">
                <span class="dot"></span>
                1024人在线
              </div> -->
            </div>
          </div>

          <div class="btn-wrapper">
            <el-button @click="joinGroup(group)">加入</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import Group from '@/models/Group'

@Component
export default class PublicGroups extends Vue {
  @State('publicGroups') private groups: Group[]
  @Action('joinGroup') private joinGroupAction: (group: Group) => void

  private async joinGroup(group: Group) {
    await this.joinGroupAction(group)

    this.$router.push(`/groups/${group.uuid}`)
  }
}
</script>

<style lang="scss">
.public-groups {
  width: 100%;
  padding: 20px 0;

  .groups {
    display: flex;
    flex-wrap: wrap;

    .card {
      margin: 9px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: hidden;
      position: relative;
      transition: all 0.2s ease-out;

      .bg {
        z-index: -10;

        .cover {
          width: 372px;
          height: 372px / 16 * 10;
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
            // line-height: 1.2;
            line-height: 48px;
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

    .btn-wrapper {
      position: absolute;
      bottom: 20px;
      right: 16px;
      display: none;

      button {
        cursor: pointer;
        border: none;
        background: #43b581;
        color: #ffffff;
        font-weight: 600;
      }
    }

    .card:hover {
      .btn-wrapper {
        display: block;
      }
    }
  }
}
</style>
