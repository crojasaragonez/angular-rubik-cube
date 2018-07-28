import { Component, HostListener } from '@angular/core';
import { Cube } from '../cube';
import { Mode } from '../enums/mode.enum';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent {

  cube: Cube;
  mouseDown = false;
  last: MouseEvent;
  mode: Mode;
  constructor() {
    this.cube = new Cube();
    this.mode = Mode.Play;
  }

  @HostListener('window:keydown', ['$event']) onkeyUp(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const side = this.cube.findSelection();
    if (side === undefined) {
      return;
    }
    if (event.keyCode === 39) {
      this.cube.moveRight(side.selectedCellLocation.x, true);
    }
    if (event.keyCode === 37) {
      this.cube.moveLeft(side.selectedCellLocation.x, true);
    }
    if (event.keyCode === 40) {
      this.cube.moveDown(side.selectedCellLocation.y, true);
    }
    if (event.keyCode === 38) {
      this.cube.moveUp(side.selectedCellLocation.y, true);
    }
  }

  @HostListener('window:mouseup') onMouseup() {
    this.mouseDown = false;
  }

  @HostListener('window:mousedown', ['$event']) onMousedown(event) {
    this.mouseDown = true;
    this.last = event;
  }

  @HostListener('window:mousemove', ['$event']) onMousemove(event: MouseEvent) {
    event.preventDefault();
    if (this.mouseDown) {
      this.cube.rotateX -= event.clientY - this.last.clientY;
      this.cube.rotateY += event.clientX - this.last.clientX;
      this.last = event;
    }
  }


  @HostListener('swipe',  ['$event']) onTap(e) {
    if (this.mode === Mode.Move) { return };
    const side = this.cube.findSelection();
    if (side === undefined) { return; }
    if (e.direction === 4) { this.cube.moveRight(side.selectedCellLocation.x, true); }
    if (e.direction === 2) { this.cube.moveLeft(side.selectedCellLocation.x, true); }
    if (e.direction === 16) { this.cube.moveDown(side.selectedCellLocation.y, true); }
    if (e.direction === 8) { this.cube.moveUp(side.selectedCellLocation.y, true); }
  }
}
