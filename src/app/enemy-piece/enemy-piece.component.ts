import { Component, OnInit } from '@angular/core';
import { ENEMIES } from '../enemyPieces';

@Component({
  selector: 'app-enemy-piece',
  templateUrl: './enemy-piece.component.html',
  styleUrls: ['./enemy-piece.component.css']
})
export class EnemyPieceComponent implements OnInit {
  public enemies = ENEMIES;
  constructor() {

   }

  public isEnemy(x: number, y: number): boolean {
    let isEnemy: boolean = false;
    for (let i: number = 0; i < this.enemies.length; i++)
    {
      if (this.enemies[i].x == x)
      {
        if (this.enemies[i].y == y)
        {
          isEnemy = true;
        }
      }
    }
    
    return isEnemy;
  }

  ngOnInit(): void {
  }

}
