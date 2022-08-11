import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SquaresComponent } from './squares/squares.component';
import { KnightComponent } from './knight/knight.component';
import { EnemyPieceComponent } from './enemy-piece/enemy-piece.component';

@NgModule({
  declarations: [
    AppComponent,
    SquaresComponent,
    KnightComponent,
    EnemyPieceComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
