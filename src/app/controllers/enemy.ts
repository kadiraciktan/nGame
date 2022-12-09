export interface EnemyInterface extends Phaser.Scene {
  body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  movementSpeed: number;
  animationManager: Phaser.Animations.AnimationManager;
}
