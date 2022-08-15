import { Component, OnInit } from '@angular/core';
import { SquaresComponent } from '../squares/squares.component';

@Component({
  selector: 'app-lose-window',
  templateUrl: './lose-window.component.html',
  styleUrls: ['./lose-window.component.css']
})
export class LoseWindowComponent implements OnInit {

  constructor(private component: SquaresComponent) { }

  ngOnInit(): void {
  }

  public restart(): void {
    this.component.restart();
  }

}
