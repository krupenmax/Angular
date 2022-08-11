import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.css']
})
export class KnightComponent implements OnInit {
  public x: number = 5;
  public y: number = 5;
  constructor() {

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

  ngOnInit(): void {
  }

}
