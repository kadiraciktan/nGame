import { Component } from '@angular/core';
import { KeyboardController, KeyboardKeys } from 'src/app/common';
import { PlayerController } from 'src/app/prefabs/player.controller';
import { deneme } from 'src/app/services/game.service';
import { sceneImages } from './constants/scene.images';
@Component({
  selector: 'app-game-scene',
  template: '',
  styles: [''],
})
export class GameScene extends Phaser.Scene {
  player: PlayerController;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  keys: KeyboardKeys;
  movementSpeed = 80;
  userName: string;

  userNameText: Phaser.GameObjects.Text;

  enemy: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super('SceneMain');
  }
  fireRate = 80;
  lastFired = 0;

  // Load Actions Here
  preload() {
    const keyboardController = new KeyboardController(this);
    this.load.image(sceneImages.dust.key, sceneImages.dust.path);
    this.load.spritesheet(sceneImages.player.key, sceneImages.player.path, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image(sceneImages.bullet.key, sceneImages.bullet.path);
    this.load.spritesheet(sceneImages.batwing.key, sceneImages.batwing.path, {
      frameWidth: 48,
      frameHeight: 40,
    });

    this.keys = keyboardController.keys;
  }

  // Add Actions Here
  create() {
    this.add.tileSprite(0, 0, 800, 600, sceneImages.dust.key).setOrigin(0, 0);
    this.player = new PlayerController(this);
    this.userNameText = this.add
      .text(this.player.body.x, this.player.body.y, '', {
        color: 'white',
        fontSize: '15px',
      })
      .setOrigin(0.5, -1.5);
    deneme.subscribe((data) => {
      this.userNameText.setText(data);
    });

    this.enemy = this.physics.add.sprite(300, 450, sceneImages.batwing.key);

    const enemyAnimation = this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers(sceneImages.batwing.key, {
        end: 0,
        start: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.enemy.play('fly');


    // this.player = this.physics.add.sprite(100, 450, sceneImages.player.key);
    // this.player.setCollideWorldBounds(true);

    // this.anims.create({
    //   key: 'idling',
    //   frames: [{ key: this.sceneImages.player.key, frame: 0 }],
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: 'walking',
    //   frames: this.anims.generateFrameNames(this.sceneImages.player.key, {
    //     frames: [1, 2, 4],
    //   }),
    //   frameRate: 10,
    //   repeat: -1,wad
    // });
  }

  //update delta time

  override update(time: number, deltaTime: number) {
    this.player.setPlayerMovement();

    //  text move to pos
    if (this.userNameText) {
      this.userNameText.setPosition(this.player.body.x, this.player.body.y);
    }

    //if mouse is down
    if (this.input.activePointer.isDown) {
      //if deltaTime since last shakeScreen is greater than fire rate
      if (time > this.lastFired) {
        //fire bullet
        this.lastFired = time + this.fireRate;
        //shake screen
        // this.cameras.main.shake(30, 0.01);

        //create bullet
        const bullet = this.physics.add.sprite(
          this.player.body.x,
          this.player.body.y,
          sceneImages.bullet.key
        );
        //set velocity
        bullet.setVelocity(
          (this.input.activePointer.worldX - this.player.body.x) * 10,
          (this.input.activePointer.worldY - this.player.body.y) * 10
        );

        const angle =
          Phaser.Math.Angle.Between(
            this.player.body.x,
            this.player.body.y,
            this.input.activePointer.worldX,
            this.input.activePointer.worldY
          ) +
          Math.PI / 2;

        // bullet  trail particles emitter
        const particles = this.add.particles(sceneImages.bullet.key);
        const emitter = particles.createEmitter({
          x: this.player.body.x,
          y: this.player.body.y,
          speed: 100,
          angle: {
            min: this.input.activePointer.worldX,
            max: this.input.activePointer.worldY,
          },
          scale: { start: 0.5, end: 5 },
          blendMode: 'ADD',
        });

        // draw raycast line
        // const graphics = this.add.graphics();
        // graphics.lineStyle(2, 0xffffff, 1);
        // graphics.beginPath();
        // graphics.moveTo(this.player.body.x, this.player.body.y);
        // graphics.lineTo(
        //   this.input.activePointer.worldX,
        //   this.input.activePointer.worldY
        // );
        // graphics.closePath();
        // graphics.strokePath();

        //set rotation
        bullet.setRotation(angle);

        bullet.setCollideWorldBounds(true);

        bullet.body.onWorldBounds = true;

        // remove bullet when out of bounds
        bullet.body.world.on('worldbounds', (body: any) => {
          if (body.gameObject === bullet) {
            //remove particles

            emitter.stop();
            particles.destroy();
            bullet.destroy();
            // graphics.destroy();
          }
        });

        this.physics.add.collider(
          bullet,
          this.player.body,
          (bullet, player) => {
            bullet.destroy();
          }
        );
      }
    }
  }

  // setPlayerMovement() {
  //   if (this.keys.A.isDown) {
  //     this.player.setVelocityX(-this.movementSpeed);
  //   } else if (this.keys.D.isDown) {
  //     this.player.setVelocityX(this.movementSpeed);
  //   }

  //   if (this.keys.W.isDown) {
  //     this.player.setVelocityY(-this.movementSpeed);
  //   } else if (this.keys.S.isDown) {
  //     this.player.setVelocityY(this.movementSpeed);
  //   }

  //   if (this.keys.A.isUp && this.keys.D.isUp) {
  //     this.player.setVelocityX(0);
  //   }

  //   if (this.keys.W.isUp && this.keys.S.isUp) {
  //     this.player.setVelocityY(0);
  //   }

  //   const angle =
  //     Phaser.Math.Angle.Between(
  //       this.player.x,
  //       this.player.y,
  //       this.input.activePointer.x,
  //       this.input.activePointer.y
  //     ) +
  //     Math.PI / 2;

  //   this.player.setRotation(angle);
  // }
}
