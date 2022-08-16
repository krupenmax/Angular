import { Component, OnInit } from '@angular/core';
import { SquaresComponent } from '../squares/squares.component';

@Component({
  selector: 'app-win-window',
  templateUrl: './win-window.component.html',
  styleUrls: ['./win-window.component.css'],
  standalone: true
})
export class WinWindowComponent implements OnInit {

  constructor(private component: SquaresComponent) { }

  ngOnInit(): void {
  }

  public restart(): void {
    this.component.restart();
  }

}
