<template>
  <div class="login">
    <login-register />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LoginRegister from '@/components/LoginRegister.vue'

@Component({ components: { LoginRegister } })
export default class Login extends Vue {}
</script>

