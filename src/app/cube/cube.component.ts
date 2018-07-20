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


  mouseMoved(ev) {
    let rotY = ev.pageX * 0.1;
    let rotX = ev.pageY * 0.1;
    //$("#cube").css("transform", "translateZ( -100px) rotateX( " + rotX + "deg) rotateY(" + rotY + "deg)");
  }
}
