<template>
  <div class="login-and-register">
    <main :class="{ flipped }">
      <div class="card front">
        <login-form flip="flip"/>
        <div class="side">
          <h1>Hello, Friend!</h1>
          <p>Enter your personnel details and start journey with us</p>
          <el-button type="primary" round>SIGN UP</el-button>
        </div>
      </div>

      <div class="card back">
        <div class="side">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personnal info</p>
          <el-button type="primary" round>SIGN IN</el-button>
        </div>
        <div class="register-form">This is back</div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LoginForm from '@/components/LoginForm.vue'

@Component({ components: { LoginForm } })
export default class LoginRegister extends Vue {
  private flipped = false

  private flip() {
    this.flipped = !this.flipped
  }
}
</script>

<style lang="scss">
.login-and-register {
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

        .el-button {
          outline: none;
          padding-left: 64px;
          padding-right: 64px;
          letter-spacing: 2px;
          border: 1px solid #fff;
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

      .side {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }
    }
  }
}
</style>

