<template>
  <div class="groups">
    <channels/>
    <group-chat/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Channels from '@/components/Channels.vue'
import GroupChat from '@/components/GroupChat.vue'

@Component({ components: { Channels, GroupChat } })
export default class Groups extends Vue {}
</script>

<style lang="scss">
.groups {
  width: 100%;
  display: flex;
}
</style>

