<template>
  <div class="login-form">
    <h1>登录到团子</h1>

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
      <el-form-item prop="email">
        <el-input v-model="formData.email" placeholder="邮箱">
          <font-awesome-icon slot="prefix" icon="envelope" size="lg"/>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model="formData.password" placeholder="密码">
          <font-awesome-icon slot="prefix" icon="lock" size="lg"/>
        </el-input>
      </el-form-item>
    </el-form>

    <p>
      <a href>忘记密码？</a>
    </p>

    <el-button type="primary" round @click="submit">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { ElForm } from 'element-ui/types/form'

@Component
export default class LoginForm extends Vue {
  @Action('login') private actionLogin: (data: {}) => void

  private URL = 'api/v1/login'

  private formData = { email: '', password: '' }
  private rules = {
    email: [
      { required: true, message: '请输入你的邮箱' },
      { type: 'email', message: '不是一个合法的邮箱' }
    ],
    password: [{ required: true, message: '密码不能为空' }]
  }

  get form() {
    return this.$refs.form as ElForm
  }

  private submit() {
    this.form.validate(valid => {
      if (valid) this.actionLogin(this.formData)
    })
  }
}
</script>

<style lang="scss">
.login-form {
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

  .el-form {
    .el-input {
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
  }

  > p > a {
    color: #464847;
  }
}
</style>

