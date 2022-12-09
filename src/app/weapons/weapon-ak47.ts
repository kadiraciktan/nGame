import { WeaponInterface } from '../common/weapon';
import { PlayerController } from '../prefabs/player.controller';
import { sceneImages } from '../scenes/game-scene/constants/scene.images';

export class WeaponAk47 implements WeaponInterface {
  name = 'AK47';
  fireRate = 100;
  damage = 10;
  bulletSpeed = 1000;
  origin: Phaser.Math.Vector2 = new Phaser.Math.Vector2(2, 0.5);
  weaponContainer: Phaser.GameObjects.Container;
  body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(public player: PlayerController) {
    this.origin = new Phaser.Math.Vector2(0, 0);
    this.body = player.scene.physics.add.sprite(
      this.origin.x,
      this.origin.y,
      sceneImages.weapons.ak47.key
    );

    const text = this.player.scene.add.text(10, 10, '30|90', {
      color: 'white',
      fontSize: '15px',
    });

    this.weaponContainer = player.scene.add.container(32, 32);
    this.weaponContainer.add([this.body, text]);
  }
}
