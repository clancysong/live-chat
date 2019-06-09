<template>
  <div class="friend-list">
    <header>
      <h3>好友</h3>
      <el-button @click="changeTableState('ONLINE_FRIENDS')">在线</el-button>
      <el-button @click="changeTableState('ALL_FRIENDS')">所有</el-button>
      <el-button @click="changeTableState('FRIENDS_REQUESTS')">待审核</el-button>
      <el-button>添加好友</el-button>
    </header>

    <el-table v-show="isFriendList" :data="tableData" style="width: 100%">
      <el-table-column label="名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{ scope.row.status === 'online' ? '在线' : '离线' }}</template>
      </el-table-column>
      <el-table-column>
        <template class="actions" slot-scope="scope">
          <el-button @click="removeFriend(scope.row.id)">
            <font-awesome-icon :icon="['fas', 'user-times']" size="lg"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table v-show="isFriendRequestList" :data="tableData" style="width: 100%">
      <el-table-column label="名称">
        <template slot-scope="scope">{{ scope.row.requester_name }}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{ scope.row.requester_status === 'online' ? '在线' : '离线' }}</template>
      </el-table-column>
      <el-table-column>
        <template class="actions" slot-scope="scope">
          <el-button @click="handleFriendRequest({ id: scope.row.id, accept: true })">
            <font-awesome-icon :icon="['fas', 'check']" size="lg"/>
          </el-button>

          <el-button @click="handleFriendRequest({ id: scope.row.id, accept: false })">
            <font-awesome-icon :icon="['fas', 'times']" size="lg"/>
          </el-button>
        </template>
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
  @Action('fetchFriendRequest') private fetchFriendRequest: () => void
  @Action('handleFriendRequest') private handleFriendRequest: (params: { id: number; accept: boolean }) => void
  @Action('removeFriend') private removeFriendAction: (id: number) => void

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

  private get isFriendList() {
    return this.tableState === 'ONLINE_FRIENDS' || this.tableState === 'ALL_FRIENDS'
  }

  private get isFriendRequestList() {
    return this.tableState === 'FRIENDS_REQUESTS'
  }

  private changeTableState(state: string) {
    this.tableState = state

    if (state === 'FRIENDS_REQUESTS') {
      this.fetchFriendRequest()
    }
  }

  private removeFriend(id: number) {
    this.$confirm('您确定要将该好友从您的好友列表中永久移除吗？').then(() => {
      this.removeFriendAction(id)
    })
  }
}
</script>

<style lang="scss">
.friend-list {
  width: 100%;
}
</style>


