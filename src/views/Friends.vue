<template>
  <div class="friends">
    <friend-list/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FriendList from '@/components/FriendList.vue'

@Component({ components: { FriendList } })
export default class Friends extends Vue {}
</script>

<style lang="scss">
.friends {
  flex: auto;
}
</style>
