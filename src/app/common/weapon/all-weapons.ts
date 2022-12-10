import { WeaponName } from './weapon-name.enum';

export const allWeapons = [
  {
    weaponName: WeaponName.ak47,
    fireRate: 100,
    damage: 10,
    bulletSpeed: 1000,
    origin: new Phaser.Math.Vector2(0, 0),
    reloadTime: 1000,
    ammoCap: 30,
    currentAmmo: 30,
    maxAmmo: 90,
  },
];
