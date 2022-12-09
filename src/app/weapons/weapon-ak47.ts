import { BehaviorSubject, delay, throttleTime } from 'rxjs';
import { WeaponClass } from '../common/weapon';
import { PlayerController } from '../prefabs/player.controller';
import { sceneImages } from '../scenes/game-scene/constants/scene.images';

export class WeaponAk47 extends WeaponClass {
  constructor(player: PlayerController) {
    super(player);
    this.name = 'AK47';
    this.fireRate = 250;
    this.damage = 10;
    this.bulletSpeed = 1000;
    this.reloadTime = 1000;
    this.ammoCap = 30;
    this.currentAmmo = 30;
    this.maxAmmo = 90;
  }
}
