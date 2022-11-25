import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameCanvasComponent } from './game-canvas/game-canvas.component';
import { TestSceneComponent } from './scenes/test-scene/test-scene.component';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [AppComponent, GameCanvasComponent, TestSceneComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
