import { Component, HostListener } from '@angular/core';
import { Cube } from '../models';
import { Mode, UserAction } from '../enums';
import { UserActionInterpreter } from '../user-action-interpreter';

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

  private performMove(code: number) {
    if (!Object.values(UserAction).includes(code)) { return; }
    if (this.mode !== Mode.Play) { return; }
    const side = this.cube.findSelectedSide();
    if (side === undefined) { return; }
    const interpreter = new UserActionInterpreter(side);
    const move = interpreter.resolve(code);
    this.cube[move.action](move.value);
  }

  @HostListener('window:keydown', ['$event']) onkeyUp(event: any) {
    event.preventDefault();
    this.performMove(event.keyCode);
    if (this.mode !== Mode.Move) { return; }
    if (event.keyCode === UserAction.RightKey) { this.cube.rotateY += 5; }
    if (event.keyCode === UserAction.LeftKey) { this.cube.rotateY -= 5; }
    if (event.keyCode === UserAction.DownKey) { this.cube.rotateX += 5; }
    if (event.keyCode === UserAction.UpKey) { this.cube.rotateX -= 5; }
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
    if (this.mode !== Mode.Move || !this.mouseDown) { return; }
    this.cube.rotateX -= event.clientY - this.last.clientY;
    this.cube.rotateY += event.clientX - this.last.clientX;
    this.last = event;
  }

  @HostListener('swipe',  ['$event']) onTap(e) {
    this.performMove(e.direction);
  }
}
