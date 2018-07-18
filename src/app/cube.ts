import { Side } from './side';
export class Cube {
  private top: Side;
  private bottom: Side;
  private left: Side;
  private right: Side;
  private front: Side;
  private back: Side;

  constructor() {

  }

  reset() {
    this.top = new Side().reset('red');
    this.bottom = new Side().reset('orange');
    this.left = new Side().reset('green');
    this.right = new Side().reset('blue');
    this.front = new Side().reset('yellow');
    this.back = new Side().reset('white');
  }

  moveDown(position: number) {
    [0, 1, 2].forEach(cell => {
      var first = this.bottom.cells[cell][position];
      this.bottom.cells[cell][position] = this.front.cells[cell][position];
      this.front.cells[cell][position] = this.top.cells[cell][position];
      this.top.cells[cell][position] = this.back.cells[cell][position];
      this.back.cells[cell][position] = first;
    });
  }

  moveRight(position: number) {
    [0, 1, 2].forEach(cell => {
      var first = this.front.cells[position][cell];
      this.front.cells[position][cell] = this.left.cells[position][cell];
      this.left.cells[position][cell] = this.back.cells[position][cell];
      this.back.cells[position][cell] = this.right.cells[position][cell];
      this.right.cells[position][cell] = first;
    });
  }
}
