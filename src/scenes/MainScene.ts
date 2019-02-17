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
  private platforms: Phaser.Physics.Arcade.StaticGroup
  private player: Player
  private oldPlayerPosition = { x: 500, y: 400 }
  private otherPlayers: Player[] = []
  private keys: Keys
  private ws: WebSocket

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
  private WS_URL = 'ws://127.0.0.1:10000'
  private EVENT_TYPE = {
    INIT_OTHER_PLAYERS: 'init other players',
    CREATE_PLAYER: 'create player',
    PLAYER_MOVEMENT: 'player movement',
    ADD_OTHER_PLAYER: 'add other player',
    REMOVE_PLAYER: 'remove player'
  }

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

    this.ws = new WebSocket(this.WS_URL)

    this.ws.onmessage = this.handleMessage

    window.addEventListener('beforeunload', () => {
      this.ws.send(
        JSON.stringify({ type: this.EVENT_TYPE.REMOVE_PLAYER, body: { id: this.player.id } })
      )
    })
  }

  public update(): void {
    if (this.player) {
      const { id, sprite } = this.player
      const { x, y } = sprite

      if (x !== this.oldPlayerPosition.x || y !== this.oldPlayerPosition.y) {
        this.ws.send(JSON.stringify({ type: this.EVENT_TYPE.PLAYER_MOVEMENT, body: { id, x, y } }))
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

  private handleMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data)

    switch (data.type) {
      case this.EVENT_TYPE.CREATE_PLAYER: {
        this.player = {
          id: data.body.id,
          sprite: this.physics.add.sprite(data.body.x, data.body.y, 'alien')
        }
        this.player.sprite.setCollideWorldBounds(true)
        this.physics.add.collider(this.platforms, this.player.sprite)
      }

      case this.EVENT_TYPE.INIT_OTHER_PLAYERS: {
        if (data.body instanceof Array) {
          data.body.forEach((playerInfo: PlayerInfo) => {
            this.addOtherPlayer(playerInfo)
          })
        }
        break
      }

      case this.EVENT_TYPE.ADD_OTHER_PLAYER: {
        this.addOtherPlayer(data.body)
        break
      }

      case this.EVENT_TYPE.PLAYER_MOVEMENT: {
        this.otherPlayers.forEach((player: Player) => {
          if (data.body.id === player.id) {
            player.sprite.x = data.body.x
            player.sprite.y = data.body.y
          }
        })
        break
      }

      case this.EVENT_TYPE.REMOVE_PLAYER: {
        this.otherPlayers.forEach((player: Player, index) => {
          if (data.body.id === player.id) {
            player.sprite.destroy()
            this.otherPlayers.splice(index, 1)
          }
        })
        break
      }

      default: {
        throw new Error('Type Error')
      }
    }
  }

  private addOtherPlayer = (playerInfo: PlayerInfo) => {
    const player = this.physics.add.sprite(playerInfo.x, playerInfo.y, 'alien')
    player.setCollideWorldBounds(true)
    this.physics.add.collider(this.platforms, player)

    this.otherPlayers.push({ id: playerInfo.id, sprite: player })
  }
}

export default MainScene
