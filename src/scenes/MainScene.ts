class MainScene extends Phaser.Scene {
  constructor() {
    super('main')
  }

  public create(): void {
    this.add.text(0, 0, 'Hello World')
  }
}

export default MainScene
