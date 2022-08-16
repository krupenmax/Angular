import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { Square } from '../square';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-squares',
  templateUrl: './squares.component.html',
  styleUrls: ['./squares.component.css'],
  standalone: true
})

@Injectable({
  providedIn: 'root'
})

export class SquaresComponent implements OnInit, AfterViewInit {

  
  public isFirstMove = true;
  public isSecondMove = false;
  public squares: Square[][];
  public prevX: number = 0;
  public prevY: number = 0;
  public KnightX: number = 0;
  public KnightY: number = 0;

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
        this.squares[i][j].isEnemy = false;
        this.squares[i][j].isKnight = false;
      }
    }
  }

  public checkForFirstMove(): boolean {
    return this.isFirstMove;
  } 

  public Clicked(x: number, y: number): void {
    if (this.isSecondMove == true)
    {
      this.isSecondMove = false;
    }
    if (this.isToMove(x, y) == true || this.squares[x][y].isKnight == true)
    {
      this.prevX = this.KnightX;
      this.prevY = this.KnightY;
    }
    if (this.isToMove(x, y) == true && this.squares[x][y].isEnemy == false)
    {
      for (let i: number = 0; i < 10; i++)
      {
        for (let j: number = 0; j < 10; j++)
        {
          this.squares[i][j].isKnight = false;
        }
      }
      this.squares[x][y].isKnight = true;
      this.KnightX = x;
      this.KnightY = y;
      this.changeToUnMoveTo(x, y);
      this.cdr$.detectChanges();
    }
    if (this.squares[x][y].isEnemy == false && this.squares[x][y].isKnight == true)
    {
      this.isKnight(x, y);
      this.squares[x][y].isEnemy = true;
      this.cdr$.detectChanges();
    }
    else
    {
      if (this.isFirstMove)
      {
        this.squares[x][y].isKnight = true;
        this.KnightX = x;
        this.KnightY = y;
        this.isFirstMove = false;
        this.isSecondMove = true;
        this.cdr$.detectChanges();
      } 
    }
    
  }

  public stepback(): void {
    if (this.isFirstMove == false && this.isSecondMove == false)
    {
      this.changeToUnMoveTo(0, 0);
      this.squares[this.KnightX][this.KnightY].isKnight = false;
      this.squares[this.prevX][this.prevY].isKnight = true;
      this.squares[this.KnightX][this.KnightY].isEnemy = false;
      this.KnightX = this.prevX;
      this.KnightY = this.prevY;
      this.changeToPicked(this.prevX, this.prevY);
      this.cdr$.detectChanges();
    }
  }

  public restart(): void {
    for (let i: number = 0; i < 10; i++)
    {
      for (let j: number = 0; j < 10; j++)
      {
        this.squares[i][j].isEnemy = false;
        this.squares[i][j].isKnight = false;
        this.squares[i][j].isSelected = false;
        this.squares[i][j].isToMove = false;
      }
    }
    this.isFirstMove = true;
    this.cdr$.detectChanges();
  }

  public checkForWin(x: number, y: number): boolean {
    let isWin: boolean = true;
    for (let i: number = 0; i < 10; i++)
    {
      for (let j: number = 0; j < 10; j++)
      {
        if (this.squares[i][j].isEnemy == false && i != x && j != y)
        {
          isWin = false;
        }
      }
    }
    if (this.squares[x][y].isKnight != true)
    {
      isWin = false;
    }
    return isWin;
  }

  public checkForLose(x: number, y: number): Boolean {
    if (this.checkForWin(x,y) == false)
    {
      if (this.squares[x][y].isKnight == true)
        {
        let isLost: Boolean = true;
        if (x - 2 >= 0 && y + 1 <=9)
        {
          if (this.squares[x - 2][y + 1].isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x - 1 >= 0 && y + 2 <= 9)
        {
          if (this.squares[x - 1][y + 2].isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x - 2 >= 0 && y - 1 >= 0)
        {
          if (this.squares[x - 2][y - 1].isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x - 1 >= 0 && y - 2 >= 0)
        {
          if (this.squares[x - 1][y - 2].isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x + 2 <= 9 && y + 1 <= 9)
        {
        if (this.squares[x + 2][y + 1].isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x + 1 <= 9 && y + 2 <= 9)
        {
          if (this.squares[x + 1][y + 2].isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x + 2 <= 9 && y - 1 >= 0)
        {
          if (this.squares[x + 2][y - 1].isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x + 1 <= 9 && y - 2 >= 0)
        {
          if (this.squares[x + 1][y - 2].isEnemy == false)
          {
            isLost = false;
          }
        }
        return isLost;
      }
      else
      {
        return false;
      }
    }
    else
    {
      return false;
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
    if (this.squares[x][y].isKnight == true)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  public isEnemy(x: number, y: number): boolean {
    if (this.squares[x][y].isEnemy == true)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  
  public isKnight(x: number, y: number): boolean {
    if (this.squares[x][y].isKnight == true)
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
