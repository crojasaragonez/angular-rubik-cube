import { Side } from './side';
import { Move, Direction } from './move';
import { MoveBehaviour, MoveIntructions } from './move-behaviour';

export class Cube {
  top: Side;
  bottom: Side;
  left: Side;
  right: Side;
  front: Side;
  back: Side;
  rotateX = -18;
  rotateY = 36;
  history: Move[];

  constructor() {
    this.reset();
  }

  reset() {
    this.top = new Side('red');
    this.bottom = new Side('orange');
    this.left = new Side('green');
    this.right = new Side('blue');
    this.front = new Side('yellow');
    this.back = new Side('white');
    // select cell 0,0 from the front side by default
    this.front.selectCell(0, 0);
    this.rotateX = -18;
    this.rotateY = 36;
    this.history = [];
  }

  resetSelection() {
    this.allSides().forEach(side => {
      side.resetSelection();
    });
  }

  findSelection() {
    return this.allSides().find(x => x.selected === true);
  }

  undo() {
    const move = this.history.pop();
    this[move.undo()](move.value, false);
  }

  moveDown(column: number, record_move = true) {
    if (column === 0) { this.left.rotateLeft(); }
    if (column === 2) { this.right.rotateRight(); }
    this.moveVertical(MoveBehaviour.Down, column, record_move);
  }

  moveUp(column: number, record_move = true) {
    if (column === 0) { this.left.rotateRight(); }
    if (column === 2) { this.right.rotateLeft(); }
    this.moveVertical(MoveBehaviour.Up, column, record_move);
  }

  moveRight(row: number, record_move = true) {
    if (row === 0) { this.top.rotateRight(); }
    if (row === 2) { this.bottom.rotateLeft(); }
    this.moveHorizontal(MoveBehaviour.Right, row, record_move);
  }

  moveLeft(row: number, record_move = true) {
    if (row === 0) { this.top.rotateLeft(); }
    if (row === 2) { this.bottom.rotateRight(); }
    this.moveHorizontal(MoveBehaviour.Left, row, record_move);
  }

  private allSides() {
    return [this.top, this.bottom, this.left, this.right, this.front, this.back];
  }

  private moveHorizontal(instructions: MoveIntructions, row, record_move = true) {
    const first = this[instructions.start_with].cells[row];
    instructions.moves.forEach(move => {
      if (move.to === '') { return this[move.from].cells[row] = first; }
      this[move.from].cells[row] = this[move.to].cells[row];
    });
    if (record_move) {
      this.history.push(new Move(row, instructions.direction));
    }
  }

  private moveVertical(instructions: MoveIntructions, column, record_move = true) {
    [0, 1, 2].forEach(cell => {
      const first = this[instructions.start_with].cells[cell][column];
      instructions.moves.forEach(move => {
        if (move.to === '') { return this[move.from].cells[cell][column] = first; }
        this[move.from].cells[cell][column] = this[move.to].cells[cell][column];
      });
    });
    if (record_move) {
      this.history.push(new Move(column, instructions.direction));
    }
  }
}
