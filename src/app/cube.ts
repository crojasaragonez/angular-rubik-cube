import { Side } from './side';
import { Move } from './move';
import { MoveIntructions } from './move-instructions';
import { MoveIntruction } from './move-intruction';
import { SidePosition } from './enums/side-position.enum';
import { Direction } from './enums/direction.enum';

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
    this.top = new Side('red', SidePosition.Top);
    this.bottom = new Side('orange', SidePosition.Bottom);
    this.left = new Side('green', SidePosition.Left);
    this.right = new Side('blue', SidePosition.Right);
    this.front = new Side('yellow', SidePosition.Front);
    this.back = new Side('white', SidePosition.Back);
    // select cell 0,0 from the front side by default
    this.front.selectCell(0, 0);
    this.rotateX = -18;
    this.rotateY = 36;
    this.history = [];
  }

  resetSelection() {
    this.allSides().forEach(side => { side.resetSelection(); });
  }

  findSelection() {
    return this.allSides().find(x => x.selected === true);
  }

  moveUp2(column: number, record_move = true) {
    if (column === 0) { this.back.rotateRight(); }
    if (column === 2) { this.front.rotateLeft(); }
    [1, 2, 3].forEach(() => { this.moveDown2(column, false); });
    this.handleHistory(new Move(column, MoveIntructions.Up2.direction), record_move);
  }

  moveDown2(column: number, record_move = true) {
    if (column === 0) { this.back.rotateLeft(); }
    if (column === 2) { this.front.rotateRight(); }
    const first = [this.top.cells[column][2], this.top.cells[column][1], this.top.cells[column][0]];
    [0, 1, 2].forEach(index => {
      this.top.cells[column][index] = this.right.cells[index][column];
      this.right.cells[index][column] = this.bottom.cells[column][index];
      this.bottom.cells[column][index] = this.left.cells[index][column];
      this.left.cells[index][column] = first[index];
    });
    this.handleHistory(new Move(column, MoveIntructions.Down2.direction), record_move);
  }

  undo() {
    const move = this.history.pop();
    this[move.undo()](move.value, false);
  }

  moveDown(column: number, record_move = true) {
    if (column === 0) { this.left.rotateLeft(); }
    if (column === 2) { this.right.rotateRight(); }
    this.moveVertical(MoveIntructions.Down, column, record_move);
  }

  moveUp(column: number, record_move = true) {
    if (column === 0) { this.left.rotateRight(); }
    if (column === 2) { this.right.rotateLeft(); }
    this.moveVertical(MoveIntructions.Up, column, record_move);
  }

  moveRight(row: number, record_move = true) {
    if (row === 0) { this.top.rotateRight(); }
    if (row === 2) { this.bottom.rotateLeft(); }
    this.moveHorizontal(MoveIntructions.Right, row, record_move);
  }

  moveLeft(row: number, record_move = true) {
    if (row === 0) { this.top.rotateLeft(); }
    if (row === 2) { this.bottom.rotateRight(); }
    this.moveHorizontal(MoveIntructions.Left, row, record_move);
  }

  private allSides() {
    return [this.front, this.top, this.bottom, this.left, this.right, this.back];
  }

  private moveHorizontal(instructions: MoveIntruction, row, record_move = true) {
    const first = this[instructions.start_with].cells[row];
    const opposite_row = this.oppositeIndex(row);
    instructions.moves.forEach(move => {
      if (move.from === SidePosition.Back) {
        this[move.to].cells[row] = this[move.from].cells[opposite_row].reverse();
      } else {
        this[move.to].cells[row] = this[move.from].cells[row];
      }
    });
    this[instructions.end_with].cells[opposite_row] = first.reverse();
    this.handleHistory(new Move(row, instructions.direction), record_move);
  }

  private moveVertical(instructions: MoveIntruction, column, record_move = true) {
    [0, 1, 2].forEach(cell => {
      const first = this[instructions.start_with].cells[cell][column];
      instructions.moves.forEach(move => {
        this[move.to].cells[cell][column] = this[move.from].cells[cell][column];
      });
      this[instructions.end_with].cells[cell][column] = first;
    });
    this.handleHistory(new Move(column, instructions.direction), record_move);
  }

  private handleHistory(move: Move, record_move = true) {
    if (record_move) { this.history.push(move); }
  }

  private oppositeIndex(index) {
    if (index === 1) { return index; }
    if (index === 0) { return 2; }
    return 0;
  }
}
