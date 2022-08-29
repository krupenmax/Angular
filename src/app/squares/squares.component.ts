import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, NgModule, OnInit } from '@angular/core';
import { RestartComponent } from '../restart/restart.component';
import { Square } from '../square';
import { AppModule } from '../app.module';
import { StepbackComponent } from '../stepback/stepback.component';
import { LoseWindowComponent } from '../lose-window/lose-window.component';
import { WinWindowComponent } from '../win-window/win-window.component';
import { CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-squares',
  templateUrl: './squares.component.html',
  styleUrls: ['./squares.component.css'],
  standalone: true,
  imports: [RestartComponent, StepbackComponent, LoseWindowComponent, WinWindowComponent, CommonModule]
})

@Injectable({
  providedIn: 'root'
})

export class SquaresComponent implements OnInit, AfterViewInit {

  
  public isFirstMove = true;
  public isSecondMove = false;
  public squares: Square[];
  public prevX: number[] = new Array();
  public prevY: number[] = new Array();
  public KnightX: number = 0;
  public KnightY: number = 0;
  public moveCounter: number = 1;

  constructor(private readonly cdr$: ChangeDetectorRef) {
    this.squares = new Array(100);
    for (let i: number = 0; i < 100; i++)
    {
        this.squares[i] = new Square;
        this.squares[i].isSelected = false;
        this.squares[i].isToMove = false;
        this.squares[i].isEnemy = false;
        this.squares[i].isKnight = false;
        this.squares[i].counter = 0;
    }
    let count: number = 0;
    for (let i: number = 0; i < 10; i++)
    {
      for (let j: number = 0; j < 10; j++)
      {
        this.squares[count].x = i;
        this.squares[count].y = j;
        count++;
      }
    }
  }

  public checkForFirstMove(): boolean {
    return this.isFirstMove;
  } 

  public checkForSecondMove(): boolean {
    return this.isSecondMove;
  }

  public Clicked(i: number): void {
    if (this.isFirstMove == true || this.squares[i].isToMove == true && this.squares[i].isEnemy == false)
      {
      if (this.isSecondMove == true && this.squares[i].isToMove == true)
      {
        this.isSecondMove = false;
      }
      if (this.isToMove(i) == true)
      {
        this.prevX.push(this.KnightX);
        this.prevY.push(this.KnightY);
      }
      if (this.isToMove(i) == true && this.squares[i].isEnemy == false)
      {
        for (let i: number = 0; i < 100; i++)
        {
          this.squares[i].isKnight = false;
        }
        this.squares[i].isKnight = true;
        this.KnightX = this.squares[i].x;
        this.KnightY = this.squares[i].y;
        this.squares[i].counter = this.moveCounter;
        this.moveCounter++;
        this.changeToUnMoveTo();
        this.cdr$.detectChanges();
      }
      if (this.squares[i].isEnemy == false && this.squares[i].isKnight == true)
      {
        this.isKnight(i);
        this.squares[i].isEnemy = true;
        this.cdr$.detectChanges();
      }
      else
      {
          if (this.isFirstMove)
          {
            for (let i: number = 0; i < 100; i++)
            {
              this.squares[i].isKnight = false;
            }
          }
          this.squares[i].isKnight = true;
          this.KnightX = this.squares[i].x;
          this.KnightY = this.squares[i].y;
          this.squares[i].counter = this.moveCounter;
          this.moveCounter++;
          this.isFirstMove = false; 
          this.squares[i].isEnemy = true;
          this.isSecondMove = true;
          this.changeToPicked(this.squares[i].x, this.squares[i].y);
          this.cdr$.detectChanges();
        } 
      }
    }


  public stepback(): void {
    if (this.isFirstMove == false && this.isSecondMove == false && this.KnightX != this.prevX[this.prevX.length] && this.KnightY != this.prevY[this.prevY.length])
    {
      if (this.prevX.length >= 1)
      {
        this.changeToUnMoveTo();
        this.findByCoordinates(this.KnightX, this.KnightY).isKnight = false;
        this.findByCoordinates(this.KnightX, this.KnightY).isEnemy = false;
        this.KnightX = this.prevX[this.prevX.length - 1];
        this.prevX.splice(this.prevX.length - 1, 1);
        this.KnightY = this.prevY[this.prevY.length - 1];
        this.prevY.splice(this.prevY.length - 1, 1);
        this.changeToPicked(this.prevX[this.prevX.length], this.prevY[this.prevY.length]);
        this.findByCoordinates(this.KnightX, this.KnightY).isKnight = true;
        this.changeToPicked(this.KnightX, this.KnightY);
        this.moveCounter--;
        this.cdr$.detectChanges();
      }
    }
  }

  public restart(): void {
    for (let i: number = 0; i < 100; i++)
    {
        this.squares[i].isEnemy = false;
        this.squares[i].isKnight = false;
        this.squares[i].isSelected = false;
        this.squares[i].isToMove = false;
    }
    this.prevX.splice(0, this.prevX.length);
    this.prevY.splice(0, this.prevX.length);
    this.isFirstMove = true;
    this.moveCounter = 1;
    this.cdr$.detectChanges();
  }

  public checkForWin(): boolean {
    let isWin: boolean = true;
    for (let i: number = 0; i < 100; i++)
    {
        if (this.squares[i].isEnemy == false && this.squares[i].isKnight != true)
        {
          isWin = false;
        }
    }
    return isWin;
  }

  public getIndex(x:number, y: number): number {
    let numberBack: number = 0;
    for (let i: number = 0; i < 100; i++)
    {
      if (this.squares[i].x == x && this.squares[i].y == y)
      {
        numberBack = i;
      }
    }
    return numberBack;
  }

  public checkForLose(): Boolean {
    let x: number = 0;
    let y: number = 0;
    for (let i: number = 0; i < 100; i++)
    {
      if (this.squares[i].isKnight == true)
      {
        x = this.squares[i].x;
        y = this.squares[i].y;
      }
    }
    if (this.checkForWin() == false)
    {
      if (this.findByCoordinates(x, y).isKnight == true)
        {
        let isLost: Boolean = true;
        if (x - 2 >= 0 && y + 1 <= 9)
        {
          if (this.findByCoordinates(x - 2, y + 1).isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x - 1 >= 0 && y + 2 <= 9)
        {
          if (this.findByCoordinates(x - 1, y + 2).isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x - 2 >= 0 && y - 1 >= 0)
        {
          if (this.findByCoordinates(x - 2, y - 1).isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x - 1 >= 0 && y - 2 >= 0)
        {
          if (this.findByCoordinates(x - 1, y - 2).isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x + 2 <= 9 && y + 1 <= 9)
        {
        if (this.findByCoordinates(x + 2, y + 1).isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x + 1 <= 9 && y + 2 <= 9)
        {
          if (this.findByCoordinates(x + 1, y + 2).isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x + 2 <= 9 && y - 1 >= 0)
        {
          if (this.findByCoordinates(x + 2, y - 1).isEnemy == false)
          {
            isLost = false;
          }
        }
        if (x + 1 <= 9 && y - 2 >= 0)
        {
          if (this.findByCoordinates(x + 1, y - 2).isEnemy == false)
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

  public findByCoordinates(x: number, y: number): Square {
    let returningValue: Square = new Square;
    for (let i: number = 0; i < 100; i++)
    {
      if (this.squares[i].x == x && this.squares[i].y == y)
      {
        returningValue = this.squares[i];
      }
    }
    return returningValue;
  }

  public changeToPicked(x: number, y: number): void {
    this.findByCoordinates(x, y).isSelected = true;

    if (y + 1 <= 9 && x - 2 >= 0)
    this.findByCoordinates(x - 2, y + 1).isToMove = true;

    if (y + 2 <= 9 && x - 1 >= 0)
    this.findByCoordinates(x - 1, y + 2).isToMove = true;

    if (y - 1 >= 0 && x - 2 >= 0)
    this.findByCoordinates(x - 2, y - 1).isToMove = true;
    
    if (y - 2 >= 0 && x - 1 >= 0)
    this.findByCoordinates(x - 1, y - 2).isToMove = true;

    if (y + 1 <= 9 && x + 2 <= 9)
    this.findByCoordinates(x + 2, y + 1).isToMove = true;

    if (y + 2 <= 9 && x + 1 <= 9)
    this.findByCoordinates(x + 1,y + 2).isToMove = true;
    
    if (y - 1 >= 0 && x + 2 <= 9)
    this.findByCoordinates(x + 2, y - 1).isToMove = true;
    
    if (y - 2 >= 0 && x + 1 <= 9)
    this.findByCoordinates(x + 1, y - 2).isToMove = true;

    this.cdr$.detectChanges();
  }

  public changeToUnMoveTo(): void {
    for (let i: number = 0; i < 100; i++)
    {
      this.squares[i].isSelected = false;
    }

    for (let i: number = 0; i < 100; i++)
    {
      this.squares[i].isToMove = false;
    }

    this.cdr$.detectChanges();
  }

  public isStartPosition(i: number) : boolean {
    if (this.squares[i].isKnight == true)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  public isEnemy(i: number): boolean {
    if (this.squares[i].isEnemy == true)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  
  public isKnight(i: number): boolean {
    if (this.squares[i].isKnight == true)
    {
      if (this.squares[i].isSelected == false)
      {
        this.changeToPicked(this.squares[i].x, this.squares[i].y); 
      }      
      else
      {
        this.changeToUnMoveTo();
      }
      return true;
    }
    else
    {
      return false;
    }
  }

  public isToMove(i: number): boolean {
    if (this.squares[i].isToMove == true)
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
