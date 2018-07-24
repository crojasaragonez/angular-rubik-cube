import { Component, OnInit, HostListener } from '@angular/core';
import { Cube } from '../cube';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit {

  cube: Cube;
  rotateX: number;
  rotateY: number;
  mouseDown: boolean = false;
  last: MouseEvent;
  constructor() {
    this.cube = new Cube();
    this.cube.reset();
    this.rotateX = -18;
    this.rotateY = 36;
  }

  ngOnInit() {
  }

  @HostListener('window:keydown', ['$event']) onkeyUp(event: any) {
    if (event.keyCode === 39) {
      this.rotateY += 5;
    }
    if (event.keyCode === 37) {
      this.rotateY -= 5;
    }
    if (event.keyCode === 40) {
      this.rotateX += 5;
    }
    if (event.keyCode === 38) {
      this.rotateX -= 5;
    }
    event.stopPropagation();
  }

  @HostListener('window:mouseup') onMouseup() {
    this.mouseDown = false;
  }

  @HostListener('window:mousedown', ['$event']) onMousedown(event) {
    this.mouseDown = true;
    this.last = event;
  }

  @HostListener('window:mousemove', ['$event']) onMousemove(event: MouseEvent) {
    if(this.mouseDown) {
      this.rotateX -= event.clientY - this.last.clientY;
      this.rotateY += event.clientX - this.last.clientX;
      this.last = event;
    }
  }
}
