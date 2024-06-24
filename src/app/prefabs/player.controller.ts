import { KeyboardController, KeyboardKeys } from '../common';
import { WeaponClass } from '../common/weapon';
import { PlayerWeaponController } from '../controllers/player-weapon.controller';
import { sceneImages } from '../scenes/game-scene/constants/scene.images';
import { WeaponAk47 } from '../weapons/weapon-ak47';

export class PlayerController {
  body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  keys: KeyboardKeys;
  movementSpeed = 80;
  currentHandState: 'empty' | 'right' | 'left' | 'both' = 'empty';
  isGamePaused = false;
  // gameObject: Phaser.GameObjects.Group;
  container: Phaser.GameObjects.Container;
  currentWeapon: WeaponClass;
  currentAngle: number;

  constructor(public scene: Phaser.Scene) {}

  preload() {
    this.scene.load.spritesheet(
      sceneImages.player.key,
      sceneImages.player.path,
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
    this.scene.load.image(sceneImages.bullet.key, sceneImages.bullet.path);
    this.scene.load.image(
      sceneImages.weapons.ak47.key,
      sceneImages.weapons.ak47.path
    );
  }

  create() {
    this.keys = new KeyboardController(this.scene).keys;
    this.body = this.scene.physics.add.sprite(100, 450, sceneImages.player.key);
    this.currentWeapon = new WeaponAk47(this);
    this.body.setCollideWorldBounds(true);
    this.body.setDrag(0.99);
    this.body.setTexture(sceneImages.player.key, 2);
    this.scene.input.keyboard.clearCaptures();
  }

  update() {
    this.setPlayerMovement();
    if (this.scene.input.activePointer.isDown) {
      this.currentWeapon.fireWeapon();
    }
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
      this.body.setTexture(sceneImages.player.key, 2);
    }

    this.currentAngle =
      Phaser.Math.Angle.Between(
        this.body.x,
        this.body.y,
        this.scene.input.activePointer.x,
        this.scene.input.activePointer.y
      ) +
      Math.PI / 2;

    this.body.setRotation(this.currentAngle);

    this.currentWeaponSetPosition(this.currentAngle);

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

  currentWeaponSetPosition(angle: number = 0) {
    this.currentWeapon.weaponContainer.setPosition(this.body.x, this.body.y);
    this.currentWeapon.weaponContainer.setRotation(angle);
  }
}
