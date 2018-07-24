import { Component } from '@angular/core';
import { Cube } from './cube';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cube: Cube;
  constructor() {
    this.cube = new Cube();
    this.cube.reset();
  }
}
