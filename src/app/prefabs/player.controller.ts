import { KeyboardController, KeyboardKeys } from '../common';
import { sceneImages } from '../scenes/game-scene/constants/scene.images';

export class PlayerController {
  body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  keys: KeyboardKeys;
  movementSpeed = 80;
  currentHandState: 'empty' | 'right' | 'left' | 'both' = 'empty';
  isGamePaused = false;
  // gameObject: Phaser.GameObjects.Group;
  container: Phaser.GameObjects.Container;
  currentWeapon: Phaser.GameObjects.Sprite;

  constructor(public scene: Phaser.Scene) {
    this.keys = new KeyboardController(scene).keys;
    this.body = scene.physics.add.sprite(100, 450, sceneImages.player.key);
    this.container = this.scene.add.container(32, 32);

    const text = this.scene.add.text(10, 10, 'Phaser');
    const ak47 = scene.physics.add.sprite(0, 0, sceneImages.weapons.ak47.key);
    ak47.setOrigin(0.5, 1);
    this.body.setCollideWorldBounds(true);
    this.body.setDrag(0.99);
    this.scene.input.keyboard.clearCaptures();

    this.container.add([ak47,text]);
  }

  setPlayerMovement() {
    if (this.keys.A.isDown) {
      this.body.setVelocityX(-this.movementSpeed);
    } else if (this.keys.D.isDown) {
      this.body.setVelocityX(this.movementSpeed);
    }

    if (this.keys.W.isDown) {
      this.body.setVelocityY(-this.movementSpeed);
    } else if (this.keys.S.isDown) {
      this.body.setVelocityY(this.movementSpeed);
    }

    if (this.keys.A.isUp && this.keys.D.isUp) {
      this.body.setVelocityX(0);
    }

    if (this.keys.W.isUp && this.keys.S.isUp) {
      this.body.setVelocityY(0);
    }

    if (this.keys[1].isDown) {
      this.body.setTexture(sceneImages.player.key, 1);
    }

    const angle =
      Phaser.Math.Angle.Between(
        this.body.x,
        this.body.y,
        this.scene.input.activePointer.x,
        this.scene.input.activePointer.y
      ) +
      Math.PI / 2;

    this.body.setRotation(angle);

    this.container.setPosition(this.body.x, this.body.y);
    this.container.setRotation(angle);

    // if (this.keys.ESC.isDown) {
    //   this.keys.ESC.isDown = false;
    //   console.log('ESC is up');
    //   this.isGamePaused = !this.isGamePaused;

    //   console.log('this.isGamePaused', this.isGamePaused);

    //   if (this.isGamePaused) {
    //   }

    //   if (!this.isGamePaused) {
    //     this.scene.input.keyboard.enabled = true;
    //   }
    // }
  }
}
