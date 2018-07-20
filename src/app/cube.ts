import { Side } from './side';
import { Move, Direction } from './move';
export class Cube {
  private top: Side;
  private bottom: Side;
  private left: Side;
  private right: Side;
  private front: Side;
  private back: Side;

  private history: Move[];
  constructor() {
    this.history = [];
  }

  reset() {
    this.top = new Side().reset('red');
    this.bottom = new Side().reset('orange');
    this.left = new Side().reset('green');
    this.right = new Side().reset('blue');
    this.front = new Side().reset('yellow');
    this.back = new Side().reset('white');
    this.history = [];
  }

  undo() {
    const move = this.history.pop();
    this[move.undo()](move.value, false);
  }

  moveDown(position: number, record_move = true) {
    if (position == 0) {
      this.left.rotateRight();
    }
    if (position == 2) {
      this.right.rotateRight();
    }
    [0, 1, 2].forEach(cell => {
      var first = this.front.cells[cell][position];
      this.front.cells[cell][position] = this.top.cells[cell][position];
      this.top.cells[cell][position] = this.back.cells[cell][position];
      this.back.cells[cell][position] = this.bottom.cells[cell][position];
      this.bottom.cells[cell][position] = first;
    });
    if (record_move) {
      this.history.push(new Move(position, Direction.Down));
    }
  }

  moveUp(position: number, record_move = true) {
    if (position == 0) {
      this.left.rotateLeft();
    }
    if (position == 2) {
      this.right.rotateLeft();
    }
    [0, 1, 2].forEach(cell => {
      var first = this.front.cells[cell][position];
      this.front.cells[cell][position] = this.bottom.cells[cell][position];
      this.bottom.cells[cell][position] = this.back.cells[cell][position];
      this.back.cells[cell][position] = this.top.cells[cell][position];
      this.top.cells[cell][position] = first;
    });
    if (record_move) {
      this.history.push(new Move(position, Direction.Up));
    }
  }

  moveRight(position: number, record_move = true) {
    if (position == 0) {
      this.top.rotateRight();
    }
    if (position == 2) {
      this.bottom.rotateRight();
    }
    let first = this.front.cells[position];
    this.front.cells[position] = this.left.cells[position];
    this.left.cells[position] = this.back.cells[position];
    this.back.cells[position] = this.right.cells[position];
    this.right.cells[position] = first;
    if (record_move) {
      this.history.push(new Move(position, Direction.Right));
    }
  }

  moveLeft(position: number, record_move = true) {
    if (position == 0) {
      this.top.rotateLeft();
    }
    if (position == 2) {
      this.bottom.rotateLeft();
    }
    let first = this.front.cells[position];
    this.front.cells[position] = this.right.cells[position];
    this.right.cells[position] = this.back.cells[position];
    this.back.cells[position] = this.left.cells[position];
    this.left.cells[position] = first;
    if (record_move) {
      this.history.push(new Move(position, Direction.Left));
    }
  }
}
