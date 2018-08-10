import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cube } from '../models';
import { Mode } from '../enums';

@Component({
  selector: 'app-cube-controls',
  templateUrl: './cube-controls.component.html',
  styleUrls: ['./cube-controls.component.css']
})
export class CubeControlsComponent {

  @Input() cube: Cube;
  @Input() mode: Mode;
  @Output() modeChange = new EventEmitter();

  change(newValue) {
    this.mode = newValue;
    this.modeChange.emit(newValue);
  }
}
