<template>
  <div class="login">
    <main>
      <login-form/>
      <div class="side">
        <h1>Hello, Friend!</h1>
        <p>Enter your personnel details and start journey with us</p>
        <el-button type="primary" round>SIGN UP</el-button>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LoginForm from '@/components/LoginForm.vue'

@Component({ components: { LoginForm } })
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.login {
  $main-width: 1000px;

  @mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  height: 100vh;
  background: #f0f4f3;
  @include flex-center();

  > main {
    min-width: $main-width;
    min-height: $main-width / 1.6;
    background: #fff;
    border-radius: 12px;
    box-shadow: -12px 16px 2px 0px rgba(204, 204, 204, 0.24);
    overflow: hidden;
    display: flex;

    .login-form {
      flex: 0 0 62.2%;
    }

    .side {
      flex: 0 0 37.8%;
      background: #3bb19b;
      color: #fff;
      padding: 0 84px;
      @include flex-center();
      flex-direction: column;

      > h1 {
        font-weight: 900;
        margin: 0;
      }

      > p {
        margin: 24px 0 48px;
      }

      .el-button {
        outline: none;
        padding-left: 64px;
        padding-right: 64px;
        letter-spacing: 2px;
        border: 1px solid #fff;
      }
    }
  }
}
</style>

