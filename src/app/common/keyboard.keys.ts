export interface KeyboardKeys {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
  1: Phaser.Input.Keyboard.Key;
  ESC: Phaser.Input.Keyboard.Key;
}
export class KeyboardController extends Phaser.Input.InputPlugin {
  keys: KeyboardKeys;
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.keys = {
      W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      1: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
      ESC: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
    };
  }
}
