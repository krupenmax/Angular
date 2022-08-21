import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SquaresComponent } from '../squares/squares.component';

@Component({
  selector: 'app-stepback',
  templateUrl: './stepback.component.html',
  styleUrls: ['./stepback.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class StepbackComponent implements OnInit {

  constructor(private component: SquaresComponent) { }

  ngOnInit(): void {
  }

  public stepback(): void {
    this.component.stepback();
  }

  public checkForFirstMove(): boolean {
    if (this.component.checkForFirstMove() == true || this.component.isSecondMove == true)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  public checkIsNotFirstMove(): boolean {
    if (this.component.checkForFirstMove() == true || this.component.isSecondMove == true)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  
}
