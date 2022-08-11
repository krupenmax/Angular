import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.css']
})
export class KnightComponent implements OnInit {
  public x: number = 5;
  public y: number = 7;
  constructor(private readonly cdr$?: ChangeDetectorRef) {
  
   }

  public isKnight(x: number, y: number): boolean {
    if (this.x == x && this.y == y)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  public setXY(x: number, y: number): void{
    this.x = x;
    this.y = y;
    this.cdr$?.detectChanges();
    console.log(this.x, this.y);
  }

  ngOnInit(): void {
  }

}
