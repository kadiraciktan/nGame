import { BehaviorSubject, delay, map, throttleTime } from 'rxjs';
import { PlayerController } from '../prefabs/player.controller';
import { sceneImages } from '../scenes/game-scene/constants/scene.images';

export class WeaponClass {
  weaponContainer: Phaser.GameObjects.Container;
  body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  fire: BehaviorSubject<boolean>;
  reload: BehaviorSubject<boolean>;
  weaponInformationText: Phaser.GameObjects.Text;

  constructor(
    public player: PlayerController,
    public weaponName: string,
    public fireRate: number,
    public damage: number,
    public bulletSpeed: number,
    public origin: Phaser.Math.Vector2,
    public reloadTime: number,
    public ammoCap: number,
    public currentAmmo: number,
    public maxAmmo: number
  ) {
    this.fire = new BehaviorSubject<boolean>(false);
    this.reload = new BehaviorSubject<boolean>(false);

    this.body = player.scene.physics.add.sprite(
      this.origin.x,
      this.origin.y,
      sceneImages.weapons.ak47.key
    );
    this.weaponInformationText = this.player.scene.add.text(10, 10, '30|90', {
      color: 'white',
      fontSize: '12px',
    });
    this.weaponContainer = player.scene.add.container(32, 32);
    this.weaponContainer.add([this.body, this.weaponInformationText]);
    this.fire.pipe(throttleTime(this.fireRate)).subscribe((isFiring) => {
      const isWeaponFire = isFiring && this.currentAmmo > 0;
      if (isWeaponFire) {
        this.currentAmmo--;
        this.setAmmoText();
        if (this.currentAmmo <= 0) {
          this.currentAmmo = 0;
          this.reload.next(true);
        }
      }
    });

    this.reload
      .pipe(
        map((isReloading) => {
          if (isReloading) {
            this.setAmmoText(`R|${this.maxAmmo}`);
          }
          return isReloading;
        }),
        delay(this.reloadTime)
      )
      .subscribe((isReloading) => {
        if (isReloading) {
          this.currentAmmo = this.ammoCap;
          this.setAmmoText();
        }
      });

    // this.fire.pipe(delay(this.fireRate)).subscribe((isFiring) => {
    //   console.log('FiringA', this.fireRate);
    // });

    // this.fire.pipe(throttleTime(this.fireRate)).subscribe((isFiring) => {
    //   console.log('FiringA', this.fireRate);
    //   if (isFiring) {
    //     if (this.currentAmmo === 0) {
    //       return;
    //     }
    //     if (this.maxAmmo === 0 && this.currentAmmo === 0) {
    //       return;
    //     }
    //     this.currentAmmo--;
    //     if (this.currentAmmo <= 0) {
    //       this.currentAmmo = 0;
    //       this.reload.next(true);
    //     }

    //     if (this.currentAmmo < 0) {
    //       this.currentAmmo = 0;
    //     }
    //     this.setAmmoText();
    //   }
    // });

    // this.reload
    //   .pipe(
    //     map((isReloading) => {
    //       if (isReloading) {
    //         this.setAmmoText('Reloading');
    //       }
    //       return isReloading;
    //     }),
    //     delay(this.reloadTime)
    //   )
    //   .subscribe((isReloading) => {});

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
