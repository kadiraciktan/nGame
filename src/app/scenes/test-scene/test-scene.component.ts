import { Component } from '@angular/core';

@Component({
  selector: 'app-test-scene',
  template: '',
  styles: [''],
})
export class TestSceneComponent extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.Body;
  };
  platforms: Phaser.Physics.Arcade.StaticGroup;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  playerAnims: Phaser.Types.Animations.Animation[] = [];
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  debugText: Phaser.GameObjects.Text;

  constructor() {
    super({
      active: false,
      visible: false,
      key: 'Test',
    });
  }

  preload() {
    // dust image infinite loop

    this.load.image('dust', 'assets/dust.png');

    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.tileSprite(0, 0, 800, 600, 'dust').setOrigin(0, 0);
    this.add.image(400, 300, 'star');
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
    this.player = this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.debugText = this.add.text(10, 10, 'FPS : ', {
      font: '16px Courier',
      color: '#00ff00',
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  override update(time: number) {
    this.debugText.setText('FPS : ' + this.game.loop.actualFps.toFixed(0));

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-600);
    }
  }
}
