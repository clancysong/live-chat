import socket, { EVENT_TYPE } from '@/utils/socket'

interface Keys {
  LEFT: Phaser.Input.Keyboard.Key
  RIGHT: Phaser.Input.Keyboard.Key
  JUMP: Phaser.Input.Keyboard.Key
}

interface PlayerInfo {
  id: string
  x: number
  y: number
}

interface Player {
  id: string
  sprite: Phaser.Physics.Arcade.Sprite
}

class MainScene extends Phaser.Scene {
  private ALIEN = [
    '....44........',
    '....44........',
    '......5.......',
    '......5.......',
    '....ABBBBA....',
    '...ABBBBBBA...',
    '..ABB8228BBA..',
    '..BB882288BB..',
    '.ABB885588BBA.',
    'BBBB885588BBBB',
    'BBBB788887BBBB',
    '.ABBB7777BBBA.',
    '.ABBBBBBBBBBA.',
    '.AABBBBBBBBAA.',
    '.AAAAAAAAAAAA.',
    '.5AAAAAAAAAA5.'
  ]

  private platforms: Phaser.Physics.Arcade.StaticGroup
  private player: Player
  private oldPlayerPosition = { x: 500, y: 400 }
  private otherPlayers: Player[] = []
  private keys: Keys

  constructor() {
    super('main')
  }

  public create(): void {
    this.platforms = this.physics.add.staticGroup()
    this.platforms.add(this.add.rectangle(500, 700, 1000, 100, 0x222222))
    this.platforms.add(this.add.rectangle(100, 450, 300, 40, 0x222222))
    this.platforms.add(this.add.rectangle(900, 450, 300, 40, 0x222222))
    this.platforms.add(this.add.rectangle(500, 250, 500, 40, 0x222222))

    this.textures.generate('alien', { data: this.ALIEN, pixelWidth: 4 })

    this.keys = {
      LEFT: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      RIGHT: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      JUMP: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    this.bindSocketEvents()
  }

  public update(): void {
    if (this.player) {
      const { id, sprite } = this.player
      const { x, y } = sprite

      if (x !== this.oldPlayerPosition.x || y !== this.oldPlayerPosition.y) {
        const playerInfo: PlayerInfo = { id, x, y }
        socket.send(EVENT_TYPE.PLAYER_MOVEMENT, playerInfo)
      }

      this.oldPlayerPosition = { x, y }

      if (this.keys.LEFT.isDown) {
        sprite.setVelocityX(-300)
      } else if (this.keys.RIGHT.isDown) {
        sprite.setVelocityX(300)
      } else {
        sprite.setVelocityX(0)
      }

      if (this.keys.JUMP.isDown && sprite.body.touching.down) {
        sprite.setVelocityY(-1000)
      }
    }
  }

  private bindSocketEvents = () => {
    socket.on(EVENT_TYPE.INIT_OTHER_PLAYERS, data => this.initOtherPlayers(data))
    socket.on(EVENT_TYPE.CREATE_PLAYER, data => this.createPlayer(data))
    socket.on(EVENT_TYPE.ADD_OTHER_PLAYER, data => this.addOtherPlayer(data))
    socket.on(EVENT_TYPE.PLAYER_MOVEMENT, data => this.playerMovement(data))
    socket.on(EVENT_TYPE.REMOVE_PLAYER, data => this.removePlayer(data))

    window.addEventListener('beforeunload', () => {
      socket.send(EVENT_TYPE.REMOVE_PLAYER, { id: this.player.id })
    })
  }

  private initOtherPlayers = (playersInfo: PlayerInfo[]) => {
    playersInfo.forEach((playerInfo: PlayerInfo) => this.addOtherPlayer(playerInfo))
  }

  private createPlayer = (playerInfo: PlayerInfo) => {
    this.player = {
      id: playerInfo.id,
      sprite: this.physics.add.sprite(playerInfo.x, playerInfo.y, 'alien')
    }
    this.player.sprite.setCollideWorldBounds(true)
    this.physics.add.collider(this.platforms, this.player.sprite)
  }

  private addOtherPlayer = (playerInfo: PlayerInfo) => {
    const player = this.physics.add.sprite(playerInfo.x, playerInfo.y, 'alien')
    player.setCollideWorldBounds(true)
    this.physics.add.collider(this.platforms, player)

    this.otherPlayers.push({ id: playerInfo.id, sprite: player })
  }

  private playerMovement = (playerInfo: PlayerInfo) => {
    this.otherPlayers.forEach((player: Player) => {
      if (playerInfo.id === player.id) {
        player.sprite.x = playerInfo.x
        player.sprite.y = playerInfo.y
      }
    })
  }

  private removePlayer = (playerInfo: { id: string }) => {
    this.otherPlayers.forEach((player: Player, index) => {
      if (playerInfo.id === player.id) {
        player.sprite.destroy()
        this.otherPlayers.splice(index, 1)
      }
    })
  }
}

export default MainScene
