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
    this.allSides().forEach(side => {
      side.resetSelection();
    });
  }

  findSelection() {
    return this.allSides().find(x => x.selected === true);
  }

  test() {

    MoveIntructions.Test.moves.forEach(move => {
      this[move.from].cells[1][0] = this[move.to].cells[2][1];
      this[move.from].cells[1][1] = this[move.to].cells[1][1];
      this[move.from].cells[1][2] = this[move.to].cells[0][1];
    })
    this.top.cells[1][0] = this.left.cells[2][1];
    this.top.cells[1][1] = this.left.cells[1][1];
    this.top.cells[1][2] = this.left.cells[0][1];
    /*const first = this[MoveIntructions.Test.start_with].cells[1][0];
    console.log(first);*/
    /*MoveIntructions.Test.moves.forEach(move => {

    })*/
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
    instructions.moves.forEach(move => {
      if (move.to === '') { return this[move.from].cells[row] = first; }
      this[move.from].cells[row] = this[move.to].cells[row];
    });
    if (record_move) {
      this.history.push(new Move(row, instructions.direction));
    }
  }

  private moveVertical(instructions: MoveIntruction, column, record_move = true) {
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
