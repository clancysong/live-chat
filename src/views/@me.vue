<template>
  <div class="mention-me">
    <private-chat/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import PrivateChat from '@/components/PrivateChat.vue'

@Component({ components: { PrivateChat } })
export default class Friends extends Vue {}
</script>

<style lang="scss">
.mention-me {
  flex: auto;
}
</style>
