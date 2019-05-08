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
}
</style>
