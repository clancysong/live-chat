<template>
  <div class="main">
    <side-nav/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import SideNav from '@/components/SideNav.vue'

@Component({ components: { SideNav } })
export default class Main extends Vue {
  @Action('authorize') private authorizeAction: () => void

  private created() {
    this.authorizeAction()
  }
}
</script>

<style lang="scss">
.main {
  height: 100vh;
  display: flex;
}
</style>