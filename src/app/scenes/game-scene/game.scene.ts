export interface KeyboardKeys {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
}

export class GameScene extends Phaser.Scene {
  sceneImages = {
    dust: {
      key: 'dust',
      path: 'assets/dust.png',
    },
    player: {
      key: 'vip',
      path: 'assets/vip/vip.png',
      json: 'assets/vip/vip.json',
    },
  };
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  keys: KeyboardKeys;
  movementSpeed = 80;

  constructor() {
    super('SceneMain');
  }

  preload() {
    this.load.image(this.sceneImages.dust.key, this.sceneImages.dust.path);
    //Player Sprite Sheet
    this.load.spritesheet(
      this.sceneImages.player.key,
      this.sceneImages.player.path,
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    this.keys = {
      W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  create() {
    this.add
      .tileSprite(0, 0, 800, 600, this.sceneImages.dust.key)
      .setOrigin(0, 0);
    this.player = this.physics.add.sprite(
      100,
      450,
      this.sceneImages.player.key
    );
    this.player.setCollideWorldBounds(true);

    // this.anims.create({
    //   key: 'idling',
    //   frames: [{ key: this.sceneImages.player.key, frame: 0 }],
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: 'walking',
    //   frames: this.anims.generateFrameNames(this.sceneImages.player.key, {
    //     frames: [1, 2, 4],
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
  }

  override update() {
    this.setPlayerMovement();
  }

  setPlayerMovement() {
    if (this.keys.A.isDown) {
      this.player.setVelocityX(-this.movementSpeed);
    } else if (this.keys.D.isDown) {
      this.player.setVelocityX(this.movementSpeed);
    }

    if (this.keys.W.isDown) {
      this.player.setVelocityY(-this.movementSpeed);
    } else if (this.keys.S.isDown) {
      this.player.setVelocityY(this.movementSpeed);
    }

    if (this.keys.A.isUp && this.keys.D.isUp) {
      this.player.setVelocityX(0);
    }

    if (this.keys.W.isUp && this.keys.S.isUp) {
      this.player.setVelocityY(0);
    }

    const angle =
      Phaser.Math.Angle.Between(
        this.player.x,
        this.player.y,
        this.input.activePointer.x,
        this.input.activePointer.y
      ) +
      Math.PI / 2;

    this.player.setRotation(angle);
  }

  addImages() {
    // this.load.spritesheet(
    //   this.sceneImages.player.key,
    //   this.sceneImages.player.path,
    //   {
    //     frameWidth: 32,
    //     frameHeight: 32,
    //   }
    // );
  }
}
