<template>
  <div class="friend-list">
    <header>
      <h3>好友</h3>
      <el-button @click="changeTableState('ONLINE_FRIENDS')">在线</el-button>
      <el-button @click="changeTableState('ALL_FRIENDS')">所有</el-button>
      <el-button @click="changeTableState('FRIENDS_REQUESTS')">待审核</el-button>
      <el-button>添加好友</el-button>
    </header>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        :prop="tableState === 'FRIENDS_REQUESTS' ? 'requester_name' : 'name'"
        label="名称"
      ></el-table-column>
      <el-table-column
        :prop="tableState === 'FRIENDS_REQUESTS' ? 'requester_status' : 'status'"
        label="状态"
      ></el-table-column>
      <el-table-column>
        <div class="actions" v-show="tableState === 'FRIENDS_REQUESTS'" prop="actions">
          <el-button>
            <font-awesome-icon :icon="['fas', 'check']" size="lg"/>
          </el-button>

          <el-button>
            <font-awesome-icon :icon="['fas', 'times']" size="lg"/>
          </el-button>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { Route } from 'vue-router'
import User from '@/models/User'
import FriendRequest from '@/models/FriendRequest'

@Component
export default class FriendList extends Vue {
  @State('friends') private friends: User[]
  @State('friendRequests') private friendRequests: FriendRequest[]

  private tableState = 'ONLINE_FRIENDS'

  private get tableData() {
    switch (this.tableState) {
      case 'ONLINE_FRIENDS': {
        return this.friends.filter(f => f.status === 'online')
      }

      case 'ALL_FRIENDS': {
        return this.friends
      }

      case 'FRIENDS_REQUESTS': {
        return this.friendRequests
      }

      default: {
        return []
      }
    }
  }

  private changeTableState(state: string) {
    this.tableState = state
  }
}
</script>

<style lang="scss">
.friend-list {
  width: 100%;
}
</style>


