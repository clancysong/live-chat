<template>
  <div class="group-manager">
    <el-table :data="groups" style="width: 100%">
      <el-table-column label="群组头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt>
        </template>
      </el-table-column>
      <el-table-column label="群组名称">
        <template slot-scope="scope">
          <div>{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import Group from '@/models/Group'

@Component
export default class GroupManager extends Vue {
  @State('publicGroups') private groups: Group[]
  @Action('removeGroup') private removeGroup: (id: number) => any

  private handleDelete(group: Group) {
    this.$confirm('删除群组后所有的成员、频道、消息都会被清除，确定吗？').then(() => {
      this.removeGroup(group.id)
      this.$notify({
        title: '成功',
        message: '群组已被删除',
        type: 'success'
      })
    })
  }
}
</script>

<style lang="scss">
.group-manager {
  padding: 40px;

  .el-table {
    tbody {
      > tr {
        > td {
          font-weight: 600;

          img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
