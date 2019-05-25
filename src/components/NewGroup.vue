<template>
  <div class="new-group">
    <h2>新的群组？</h2>
    <div class="create-group">
      <h3>创建</h3>
      <p>创建新的群组并邀请小伙伴加入。免费的噢！</p>
      <el-button @click="createGroup">创建群组</el-button>
    </div>
    <div class="join-group">
      <h3>加入</h3>
      <p>输入邀请码并加入您小伙伴的服务器。</p>
      <el-button>加入群组</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'

@Component
export default class NewGroup extends Vue {
  @Action('createGroup') private createGroupAction: (data: {}) => void

  private createGroup() {
    this.$prompt('请输入').then((rs: any) => this.createGroupAction({ name: rs.value }))
  }
}
</script>