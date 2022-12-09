import { BehaviorSubject, delay, map, throttleTime } from 'rxjs';
import { PlayerController } from '../prefabs/player.controller';
import { sceneImages } from '../scenes/game-scene/constants/scene.images';

export class WeaponClass {
  name: string;
  fireRate: number;
  damage: number;
  bulletSpeed: number;
  origin: Phaser.Math.Vector2;
  weaponContainer: Phaser.GameObjects.Container;
  body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  fire: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reload: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  weaponInformationText: Phaser.GameObjects.Text;
  reloadTime: number;
  ammoCap: number;
  currentAmmo: number;
  maxAmmo: number;
  constructor(public player: PlayerController) {
    this.origin = new Phaser.Math.Vector2(0, 0);
    this.body = player.scene.physics.add.sprite(
      this.origin.x,
      this.origin.y,
      sceneImages.weapons.ak47.key
    );

    this.weaponInformationText = this.player.scene.add.text(10, 10, '30|90', {
      color: 'white',
      fontSize: '15px',
    });

    this.weaponContainer = player.scene.add.container(32, 32);
    this.weaponContainer.add([this.body, this.weaponInformationText]);

    this.fire.pipe(throttleTime(this.fireRate)).subscribe((isFiring) => {
      console.log('Firing', this.fireRate);
      if (isFiring) {
        if (this.currentAmmo === 0) {
          return;
        }
        if (this.maxAmmo === 0 && this.currentAmmo === 0) {
          return;
        }
        this.currentAmmo--;
        if (this.currentAmmo <= 0) {
          this.currentAmmo = 0;
          this.reload.next(true);
        }

        if (this.currentAmmo < 0) {
          this.currentAmmo = 0;
        }
        this.setAmmoText();
        console.log('Firing');
      }
    });

    this.reload
      .pipe(
        map((isReloading) => {
          if (isReloading) {
            this.setAmmoText('Reloading');
          }
          return isReloading;
        }),
        delay(this.reloadTime)
      )
      .subscribe((isReloading) => {
        console.log('Reload complete');
      });

    // this.reload.pipe(throttleTime(this.reloadTime)).subscribe((isReloading) => {
    //   if (isReloading) {
    //     const ammoNeeded = this.maxAmmo - this.ammoCap;
    //     if (ammoNeeded < 0) {
    //       console.log('Not enough ammo');
    //       return;
    //     }
    //     this.currentAmmo = this.ammoCap;
    //     this.maxAmmo -= this.ammoCap;
    //     this.setAmmoText();
    //     console.log('Reloading');

    //     this.reload.next(false);
    //   }
    // });
  }

  setAmmoText(text?: string) {
    this.weaponInformationText.setText(
      text || `${this.currentAmmo}|${this.maxAmmo}`
    );
  }

  fireWeapon() {
    if (!this.reload.value) {
      this.fire.next(true);
    }
  }
}
