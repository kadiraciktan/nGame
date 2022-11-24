import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameCanvasComponent } from './game-canvas/game-canvas.component';
import { TestSceneComponent } from './scenes/test-scene/test-scene.component';

@NgModule({
  declarations: [
    AppComponent,
    GameCanvasComponent,
    TestSceneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
