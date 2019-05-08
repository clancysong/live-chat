<template>
  <div class="register-form">
    <h1>注册账户</h1>

    <div class="links">
      <a href>
        <font-awesome-icon :icon="['fab', 'facebook-f']" size="lg"/>
      </a>
      <a href>
        <font-awesome-icon :icon="['fab', 'google-plus-g']" size="lg"/>
      </a>
      <a href>
        <font-awesome-icon :icon="['fab', 'linkedin-in']" size="lg"/>
      </a>
    </div>

    <p>或使用你的邮箱登录：</p>

    <el-form :model="formData" :rules="rules" ref="form">
      <el-form-item prop="name">
        <el-input v-model="formData.name" placeholder="名字">
          <font-awesome-icon slot="prefix" icon="user" size="lg"/>
        </el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input v-model="formData.email" placeholder="邮箱">
          <font-awesome-icon slot="prefix" icon="envelope" size="lg"/>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="formData.password" type="password" placeholder="密码">
          <font-awesome-icon slot="prefix" icon="lock" size="lg"/>
        </el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" round @click="submit">注&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { ElForm } from 'element-ui/types/form'
import axios from 'axios'

@Component
export default class RegisterForm extends Vue {
  @Action('register') private registerAction: (data: {}) => any

  private formData = { name: '', email: '', password: '' }
  private rules = {
    name: [{ required: true, message: '请输入你的用户名' }, { max: 10, message: '用户名不能超过10个字符' }],
    email: [{ required: true, message: '请输入你的邮箱' }, { type: 'email', message: '不是一个合法的邮箱' }],
    password: [{ required: true, message: '请输入你的密码' }, { min: 6, max: 15, message: '密码长度必须在6到15位之间' }]
  }

  get form() {
    return this.$refs.form as ElForm
  }

  private submit() {
    this.form.validate(async valid => {
      if (valid) {
        const { code, data } = await this.registerAction(this.formData)

        if (code === 100) this.$socket.emit('COME_ONLINE', data.id)
      }
    })
  }
}
</script>

<style lang="scss">
.register-form {
  @mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @include flex-center();
  flex-direction: column;

  > h1 {
    color: #3bb19b;
    font-weight: 900;
    letter-spacing: 4px;
  }

  .links {
    $icon-size: 48px;
    margin: 24px 0;

    > a > svg {
      width: $icon-size;
      height: $icon-size;
      color: #1d2120;
      padding: 12px;
      border: 1px solid #e7ebea;
      border-radius: 100%;
      margin: 0 8px;
    }

    > a > svg:hover {
      color: #666666;
      transition: all 0.2s;
    }
  }

  > p {
    color: #a5a9a8;
  }

  .el-form .el-input {
    width: 320px;

    .el-input__inner {
      background: #f1f5f4;
      padding-left: 42px;
      color: #1d2120;
      border: none;
    }

    .el-input__prefix {
      left: 12px;
    }
  }

  > p > a {
    color: #464847;
  }
}
</style>

