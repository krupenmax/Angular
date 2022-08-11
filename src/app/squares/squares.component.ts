import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EnemyPieceComponent } from '../enemy-piece/enemy-piece.component';
import { KnightComponent } from '../knight/knight.component';
import { Square } from '../square';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-squares',
  templateUrl: './squares.component.html',
  styleUrls: ['./squares.component.css']
})


export class SquaresComponent implements OnInit, AfterViewInit {

  public xEnemy?: number;
  public yEnemy?: number;
  @ViewChild(EnemyPieceComponent) public enemyChild: EnemyPieceComponent = new EnemyPieceComponent;
  @ViewChild(KnightComponent) public knightChild: KnightComponent = new KnightComponent;
  
  
  public squares: Square[][];

  constructor(private readonly cdr$: ChangeDetectorRef) {
    this.squares = new Array(10);
    for (let i: number = 0; i < 10; i++)
    {
      this.squares[i] = new Array(10);
      for (let j: number = 0; j < 10; j++)
      {
        this.squares[i][j] = new Square;
        this.squares[i][j].x = i;
        this.squares[i][j].y = j;
        this.squares[i][j].isSelected = false;
        this.squares[i][j].isToMove = false;
      }
    }
    console.log(this.squares);
  }

  public Clicked(x: number, y: number): void {
    if (this.isToMove(x, y) == true)
    {
      this.knightChild.setXY(x, y);
      this.changeToUnMoveTo(x, y);
      this.cdr$.detectChanges();
    }
    else
    {
      this.isKnight(x, y);
      this.cdr$.detectChanges();
    }
    
  }

  public changeToPicked(x: number, y: number): void {
    this.squares[x][y].isSelected = true;

    if (y + 1 <= 9 && x - 2 >= 0)
    this.squares[x - 2][y + 1].isToMove = true;

    if (y + 2 <= 9 && x - 1 >= 0)
    this.squares[x - 1][y + 2].isToMove = true;

    if (y - 1 >= 0 && x - 2 >= 0)
    this.squares[x - 2][y - 1].isToMove = true;
    
    if (y - 2 >= 0 && x - 1 >= 0)
    this.squares[x - 1][y - 2].isToMove = true;

    if (y + 1 <= 9 && x + 2 <= 9)
    this.squares[x + 2][y + 1].isToMove = true;

    if (y + 2 <= 9 && x + 1 <= 9)
    this.squares[x + 1][y + 2].isToMove = true;
    
    if (y - 1 >= 0 && x + 2 <= 9)
    this.squares[x + 2][y - 1].isToMove = true;
    
    if (y - 2 >= 0 && x + 1 <= 9)
    this.squares[x + 1][y - 2].isToMove = true;

    this.cdr$.detectChanges();
  }

  public changeToUnMoveTo(x: number, y: number): void {
    for (let i: number = 0; i < 10; i++)
    {
      for (let j: number = 0; j < 10; j++)
      {
        this.squares[i][j].isSelected = false;
      }
    }

    for (let i: number = 0; i < 10; i++)
    {
      for (let j: number = 0; j < 10; j++)
      {
        this.squares[i][j].isToMove = false;
      }
    }

    this.cdr$.detectChanges();
  }

  public isStartPosition(x: number, y: number) : boolean {
    if (this.knightChild.x == x && this.knightChild.y == y)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  public isEnemy(x: number, y: number): boolean {
    return this.enemyChild.isEnemy(x,y);
  }
  
  public isKnight(x: number, y: number): boolean {
    if (this.knightChild.isKnight(x, y))
    {
      if (this.squares[x][y].isSelected == false)
      {
        this.changeToPicked(x, y); 
      }      
      else
      {
        this.changeToUnMoveTo(x, y);
      }
      return true;
    }
    else
    {
      return false;
    }
  }

  public isToMove(x: number, y: number): boolean {
    if (this.squares[x][y].isToMove == true)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {  
  }

}
