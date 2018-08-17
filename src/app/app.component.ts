import { Component } from '@angular/core';
import { Cube } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cube: Cube;
  constructor() {
    this.cube = new Cube();
  }
}
