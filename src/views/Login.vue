<template>
  <div class="login">
    <main :class="{ flipped }">
      <div class="card front">
        <login-form/>

        <div class="side">
          <h1>你好，朋友！</h1>
          <p>填写你的个人信息
            <br>并开始加入我们
          </p>
          <el-button @click="flip" type="primary" round>注&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
        </div>
      </div>

      <div class="card back">
        <div class="side">
          <h1>欢迎回来！</h1>
          <p>登录你的个人账号
            <br>以连接到服务器
          </p>
          <el-button @click="flip" type="primary" round>登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </div>

        <register-form/>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

@Component({ components: { LoginForm, RegisterForm } })
export default class Login extends Vue {
  private flipped = false

  private flip() {
    this.flipped = !this.flipped
  }
}
</script>

<style lang="scss">
.login {
  $color-primary: #3bb19b;

  @mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @mixin absolute {
    position: absolute;
    top: 0;
    left: 0;
  }

  @mixin filled {
    width: 100%;
    height: 100%;
  }

  @include flex-center();
  height: 100vh;
  background: #f0f4f3;
  perspective: 1000;

  .el-button {
    outline: none;
    padding-left: 64px;
    padding-right: 64px;
    border: 1px solid #fff;
  }

  main.flipped {
    transform: rotateY(180deg);
  }

  > main {
    $main-width: 1000px;

    min-width: $main-width;
    min-height: $main-width / 1.6;
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;

    .card {
      @include absolute();
      @include filled();
      background: #fff;
      border-radius: 12px;
      box-shadow: -12px 16px 2px 0px rgba(204, 204, 204, 0.24);
      display: flex;
      backface-visibility: hidden;

      .side {
        @include flex-center();
        flex: 0 0 37.8%;
        background: $color-primary;
        color: #fff;
        padding: 0 64px;
        flex-direction: column;

        > h1 {
          font-weight: 900;
          margin: 0;
        }

        > p {
          margin: 24px 0 48px;
        }
      }
    }

    .front {
      z-index: 1;

      .login-form {
        flex: 0 0 62.2%;
      }

      .side {
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
      }
    }

    .back {
      z-index: -1;
      transform: rotateY(-180deg);

      .register-form {
        flex: 0 0 62.2%;
      }

      .side {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }
    }
  }
}
</style>