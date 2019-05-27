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

    <el-dialog :visible.sync="editdialogVisible" :modal-append-to-body="false" width="60%">
      <h2>编辑群组信息</h2>
      <el-form :model="formData">
        <el-form-item label="群组头像">
          <label for="avatar-file">
            <div class="avatar">
              <img :src="formData.avatar.url" alt>
              <div class="mask"></div>
              <font-awesome-icon :icon="['fas', 'edit']" size="lg"/>
            </div>
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar-file"
            @change="handleFileChange"
            style="display: none;"
          >
        </el-form-item>
        <el-form-item label="群组封面">
          <label for="cover-file">
            <div class="cover">
              <img class="cover" :src="formData.cover.url" alt>
              <div class="mask"></div>
              <font-awesome-icon :icon="['fas', 'edit']" size="lg"/>
            </div>
          </label>
          <input
            type="file"
            name="cover"
            id="cover-file"
            @change="handleFileChange"
            style="display: none;"
          >
        </el-form-item>
        <el-form-item label="群组名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditorSubmit">确 定</el-button>
      </div>
    </el-dialog>
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
  @Action('updateGroup') private updateGroup: (paylod: { id: number; data: {} }) => any

  private editdialogVisible = false
  private editingGroup: Group | null = null
  private formData: any = { name: '', avatar: { file: null, url: '' }, cover: { file: null, url: '' } }

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

  private handleEdit(group: Group) {
    const { name, avatar, cover } = group

    this.editingGroup = group
    this.formData = { ...this.formData, name, avatar: { url: avatar }, cover: { url: cover } }
    this.editdialogVisible = true
  }

  private handleFileChange(e: any) {
    const { name, files } = e.target

    this.formData[name] = { file: files[0], url: URL.createObjectURL(files[0]) }
  }

  private async handleEditorSubmit() {
    if (this.editingGroup) {
      const { name, avatar, cover } = this.formData

      if (name || avatar.file || cover.file) {
        const loading = this.$loading({
          text: '正在更新信息'
        })
        const data = new FormData()

        if (name) data.append('name', name)
        if (avatar.file) {
          data.append('avatar', avatar.file)
        }
        if (cover.file) data.append('cover', cover.file)

        await this.updateGroup({ id: this.editingGroup.id, data })

        loading.close()
        this.editdialogVisible = false
      }
    }
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

  .el-dialog {
    .avatar,
    .cover {
      position: relative;
      cursor: pointer;

      > img {
        object-fit: cover;
      }

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: #000000;
        opacity: 0;
      }

      svg {
        width: 24px;
        height: 24px;
        color: #dddddd;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
      }
    }

    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;

      > img {
        width: 64px;
        height: 64px;
      }
    }

    .cover {
      svg {
        width: 32px;
        height: 32px;
      }

      > img {
        width: 192px;
        height: 108px;
      }
    }

    .avatar:hover,
    .cover:hover {
      .mask {
        opacity: 0.2;
        transition: opacity 0.2s ease-out;
      }

      svg {
        opacity: 1;
        transition: opacity 0.2s ease-out;
      }
    }

    .cover {
      width: 60%;
    }
  }
}
</style>
