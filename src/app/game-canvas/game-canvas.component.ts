import { Component } from '@angular/core';
import * as Phaser from 'phaser';
import { GameScene } from '../scenes/game-scene/game.scene';
import { TestSceneComponent } from '../scenes/test-scene/test-scene.component';

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss'],
})
export class GameCanvasComponent {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  constructor() {
    this.config = {
      type: Phaser.AUTO,

      scene: [GameScene],
      physics: {
        default: 'arcade',
        arcade: {},
      },
      backgroundColor: '#D3D3D3',
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
      },
    };
  }
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}
