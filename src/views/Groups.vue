<template>
  <div class="groups">
    <channels/>
    <group-chat :id="id"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Channels from '@/components/Channels.vue'
import GroupChat from '@/components/GroupChat.vue'

@Component({ components: { Channels, GroupChat } })
export default class Groups extends Vue {
  @Prop(String) readonly id: string
}
</script>

<style lang="scss">
.groups {
  width: 100%;
  display: flex;
}
</style>

