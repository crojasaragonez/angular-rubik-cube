import { Component, Input } from '@angular/core';
import { Cube } from '../cube';
import { Mode } from '../enums/mode.enum';

@Component({
  selector: 'app-cube-controls',
  templateUrl: './cube-controls.component.html',
  styleUrls: ['./cube-controls.component.css']
})
export class CubeControlsComponent {

  @Input() cube: Cube;
  @Input() mode: Mode;
  constructor() {

  }
}
