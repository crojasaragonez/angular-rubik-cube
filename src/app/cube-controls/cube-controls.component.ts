import { Component, Input } from '@angular/core';
import { Cube } from '../cube';

@Component({
  selector: 'app-cube-controls',
  templateUrl: './cube-controls.component.html',
  styleUrls: ['./cube-controls.component.css']
})
export class CubeControlsComponent {

  @Input() cube: Cube;
  column: number;
  row: number;
  constructor() {
    this.column = 0;
    this.row = 0;
  }
}
