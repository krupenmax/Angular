import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SquaresComponent } from './squares/squares.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, SquaresComponent], 
  exports: [SquaresComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
