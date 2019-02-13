<template>
  <div id="game-container"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Phaser from 'phaser'
import MainScene from '@/scenes/MainScene'

const config: GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#CCCCCC',
  parent: 'game-container',
  scene: MainScene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }
    }
  }
}

@Component
export default class Game extends Vue {
  public mounted(): void {
    const game = new Phaser.Game(config)
  }
}
</script>

