import { BehaviorSubject, delay, throttleTime } from 'rxjs';
import { WeaponClass } from '../common/weapon';
import { PlayerController } from '../prefabs/player.controller';
import { sceneImages } from '../scenes/game-scene/constants/scene.images';

export class WeaponAk47 extends WeaponClass {
  constructor(player: PlayerController) {
    super(
      player, // player
      'AK47', // weapon name
      100, // fire rate
      10, // damage
      100, // bullet speed
      new Phaser.Math.Vector2(1, -16),
      2500, // reload time
      30, // ammo cap
      30, // current ammo
      90 // max ammo
    );
  }
}
