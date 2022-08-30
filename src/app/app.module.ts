import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SquaresComponent } from './squares/squares.component';
import { StepbackComponent } from './stepback/stepback.component';
import { RestartComponent } from './restart/restart.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, SquaresComponent, StepbackComponent, RestartComponent], 
  exports: [SquaresComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
