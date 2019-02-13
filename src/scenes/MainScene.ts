interface Keys {
  LEFT: Phaser.Input.Keyboard.Key,
  RIGHT: Phaser.Input.Keyboard.Key,
  JUMP: Phaser.Input.Keyboard.Key
}

class MainScene extends Phaser.Scene {
  private platforms: Phaser.Physics.Arcade.StaticGroup
  private player: Phaser.Physics.Arcade.Sprite
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

    this.player = this.physics.add.sprite(500, 400, '1')
    this.player.setCollideWorldBounds(true)

    this.physics.add.collider(this.platforms, this.player)

    this.keys = {
      LEFT: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      RIGHT: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      JUMP: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    }
  }

  public update(): void {
    if (this.keys.LEFT.isDown) {
      this.player.setVelocityX(-300)
    } else if (this.keys.RIGHT.isDown) {
      this.player.setVelocityX(300)
    } else {
      this.player.setVelocityX(0)
    }

    if (this.keys.JUMP.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-1000)
    }
  }
}

export default MainScene
