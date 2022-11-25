import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import * as Phaser from 'phaser';
import { GameScene } from '../scenes/game-scene/game.scene';
import { TestSceneComponent } from '../scenes/test-scene/test-scene.component';
import { GameService } from '../services/game.service';

import { deneme } from '../services/game.service';

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss'],
})
export class GameCanvasComponent {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  userNameControl = new UntypedFormControl('');

  constructor(private gameService: GameService) {
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

    this.userNameControl.valueChanges.subscribe((userName) => {
      deneme.next(userName);
    });
  }
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}
