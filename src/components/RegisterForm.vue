<template>
  <div class="register-form">
    <h1>Create Account</h1>

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

    <p>or use your email for registrarion:</p>

    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item prop="name">
        <el-input v-model="form.name" placeholder="Name">
          <font-awesome-icon slot="prefix" icon="user" size="lg"/>
        </el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input v-model="form.email" placeholder="Email">
          <font-awesome-icon slot="prefix" icon="envelope" size="lg"/>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="form.password" type="password" placeholder="Password">
          <font-awesome-icon slot="prefix" icon="lock" size="lg"/>
        </el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" round @click="submit">SIGN IN</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import axios from 'axios'

@Component
export default class RegisterForm extends Vue {
  $refs!: { form: ElForm }

  private URL = '/api/v1/register'

  private form = { name: '', email: '', password: '' }
  private rules = {
    name: [
      { required: true, message: 'Please enter your name' },
      { max: 10, message: 'Name cannot be longer than 10 characters' }
    ],
    email: [
      { required: true, message: 'Please enter your email' },
      { type: 'email', message: 'Not a valid email' }
    ],
    password: [
      { required: true, message: 'Please enter your password' },
      { min: 6, max: 15, message: 'Password must be between 6 and 15 characters' }
    ]
  }

  private submit() {
    this.$refs.form.validate(async valid => {
      if (valid) this.register()
    })
  }

  private async register() {
    const fd = new FormData()

    fd.append('name', this.form.name)
    fd.append('email', this.form.email)
    fd.append('password', this.form.password)

    return await axios.post(this.URL, fd)
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

  .el-button {
    outline: none;
    padding-left: 64px;
    padding-right: 64px;
    letter-spacing: 2px;
    margin-top: 24px;
  }
}
</style>

