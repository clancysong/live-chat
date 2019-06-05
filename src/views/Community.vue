<template>
  <div class="community">
    <h2>社区</h2>
    <public-groups/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import PublicGroups from '@/components/PublicGroups.vue'

@Component({ components: { PublicGroups } })
export default class Community extends Vue {}
</script>

<style lang="scss">
.community {
  padding: 40px 100px;

  > h2 {
    color: #4f545c;
    font-size: 20px;
    margin: 0;
  }
}
</style>

