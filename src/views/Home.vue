<template>
  <div class="home">
    <Game/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Game from '@/components/Game.vue'

@Component({ components: { Game } })
export default class Home extends Vue {}
</script>
