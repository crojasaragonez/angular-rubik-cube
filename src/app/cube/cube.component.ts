import { Component, OnInit } from '@angular/core';
import { Cube } from '../cube';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit {

  cube: Cube
  column: number;
  row: number;
  constructor() {
    this.column = 0;
    this.row = 0;
    this.cube = new Cube();
    this.cube.reset();
  }

  ngOnInit() {
  }

}
