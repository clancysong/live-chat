<template>
  <div class="profile">
    <user-info></user-info>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import UserInfo from '@/components/UserInfo.vue'

@Component({ components: { UserInfo } })
export default class Profile extends Vue {}
</script>

<style lang="scss">
.profile {
  width: 100%;
}
</style>
