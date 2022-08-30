import { Component } from '@angular/core';
import { SquaresComponent } from './squares/squares.component';
import { ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private component: SquaresComponent, private readonly cdr$: ChangeDetectorRef) {}
  title = 'training-project';

  public restart(): void {
    this.component.restart();
  }
}
