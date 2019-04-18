<template>
  <div class="community">
    <public-groups/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import PublicGroups from '@/components/PublicGroups.vue'

@Component({ components: { PublicGroups } })
export default class Community extends Vue {}
</script>
