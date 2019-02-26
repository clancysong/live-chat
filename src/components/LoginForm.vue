<template>
  <div class="login-form">
    <h1>Sign in to Chat Live</h1>

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

    <p>or use your email account:</p>

    <el-form :model="form">
      <el-form-item>
        <el-input v-model="form.email" placeholder="Email">
          <font-awesome-icon slot="prefix" icon="envelope" size="lg"/>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="Password">
          <font-awesome-icon slot="prefix" icon="lock" size="lg"/>
        </el-input>
      </el-form-item>
    </el-form>

    <p>
      <a href>Forget your password?</a>
    </p>

    <el-button type="primary" round>SIGN IN</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class LoginForm extends Vue {
  private form = { email: '', password: '' }
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
      transition: all .2s;
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

  .el-button {
    outline: none;
    padding-left: 64px;
    padding-right: 64px;
    letter-spacing: 2px;
    margin-top: 24px;
  }
}
</style>

