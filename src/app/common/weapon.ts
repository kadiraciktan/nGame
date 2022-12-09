export interface WeaponInterface {
  name: string;
  fireRate: number;
  damage: number;
  bulletSpeed: number;
  origin: Phaser.Math.Vector2;
  weaponContainer: Phaser.GameObjects.Container;
  body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
}
