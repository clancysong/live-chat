<template>
  <div class="home">
    <home-menu/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import HomeMenu from '@/components/HomeMenu.vue'

@Component({ components: { HomeMenu } })
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  width: 100%;
  display: flex;
}
</style>