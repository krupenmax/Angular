import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SquaresComponent } from '../squares/squares.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.css']
})
export class RestartComponent implements OnInit {
  public isPopUp = false;
  constructor(private component: SquaresComponent, private readonly cdr$: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  public restart(): void {
    this.component.restart();
    this.isPopUp = false;
    this.cdr$.detectChanges();
  }

  public popUpWindow(): void
  {
    this.isPopUp = true;
  }

  public isPopedUp(): boolean
  {
    return this.isPopUp;
  }

  public closeWindow(): void
  {
    this.isPopUp = false;
    this.cdr$.detectChanges();
  }
}
