<template>
  <div class="sensitive-word-manager">
    <h2>
      <el-button @click="handleCreate">创建</el-button>
    </h2>

    <el-table :data="sensitiveWords" style="width: 100%">
      <el-table-column label="敏感词内容">
        <template slot-scope="scope">
          <div>{{ scope.row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <div>{{ new Date(scope.row.created_at).toLocaleString() }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'

@Component
export default class SensitiveWordManager extends Vue {
  @State('sensitiveWords') private sensitiveWords: any[]
  @Action('createSensitiveWord') private createSensitiveWord: (data: {}) => void
  @Action('removeSensitiveWord') private removeSensitiveWord: (id: number) => void

  private handleCreate() {
    this.$prompt('请输入敏感词内容').then((rs: any) => {
      const content = rs.value

      this.createSensitiveWord(content)
    })
  }

  private handleDelete(id: number) {
    this.$confirm('确定要删除吗').then(() => {
      this.removeSensitiveWord(id)
    })
  }
}
</script>

<style lang="scss">
.sensitive-word-manager {
  padding: 40px;

  > h2 {
    text-align: start;
  }
}
</style>
