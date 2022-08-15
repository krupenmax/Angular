import { Component } from '@angular/core';
import { SquaresComponent } from './squares/squares.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private component: SquaresComponent) {}
  title = 'training-project';

  public restart(): void {
    this.component.restart();
  }
}
