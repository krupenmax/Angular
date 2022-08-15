import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SquaresComponent } from './squares/squares.component';
import { LoseWindowComponent } from './lose-window/lose-window.component';
import { RestartComponent } from './restart/restart.component';
import { StepbackComponent } from './stepback/stepback.component';
import { WinWindowComponent } from './win-window/win-window.component';

@NgModule({
  declarations: [
    AppComponent,
    SquaresComponent,
    LoseWindowComponent,
    RestartComponent,
    StepbackComponent,
    WinWindowComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
