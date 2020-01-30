import { Side } from './side';
import { Move } from './move';
import { MoveInstructions } from '../move-instructions';
import { MoveInstruction } from '../move-instruction';
import { SidePosition, Color } from '../enums';
import { CubeHelper } from '../cube-helper';

export class Cube {
  top: Side;
  bottom: Side;
  left: Side;
  right: Side;
  front: Side;
  back: Side;
  history: Move[];
  rotateX = -18;
  rotateY = 36;

  constructor() {
    this.reset();
  }

  reset() {
    this.top = new Side(Color.Red, SidePosition.Top);
    this.bottom = new Side(Color.Orange, SidePosition.Bottom);
    this.left = new Side(Color.Green, SidePosition.Left);
    this.right = new Side(Color.Blue, SidePosition.Right);
    this.front = new Side(Color.Yellow, SidePosition.Front);
    this.back = new Side(Color.White, SidePosition.Back);
    // select cell 0,0 from the front side by default
    this.front.selectCell(0, 0);
    this.rotateX = -18;
    this.rotateY = 36;
    this.history = [];
  }

  move(move: Move, record_move = true) {
    this[move.action](move.value, record_move);
  }

  undo() {
    if (this.history.length === 0) { return; }
    this.move(this.history.pop().undo(), false);
  }

  allSides() {
    return [this.front, this.top, this.bottom, this.left, this.right, this.back];
  }

  private moveUp2(column: number, record_move = true) {
    CubeHelper.indexIterator(() => this.moveDown2(column, false));
    this.handleHistory(new Move(column, MoveInstructions.Up2.direction), record_move);
  }

  private moveDown2(column: number, record_move = true) {
    if (column === 0) { this.back.rotateLeft(); }
    if (column === 2) { this.front.rotateRight(); }

    const first = [this.top.cells[column][0], this.top.cells[column][1], this.top.cells[column][2]];
    const opposite_column = CubeHelper.oppositeIndex(column);

    CubeHelper.indexIterator(index => {
      const opposite_index = CubeHelper.oppositeIndex(index);
      this.top.cells[column][index] = this.right.cells[index][opposite_column];
      this.right.cells[index][opposite_column] = this.bottom.cells[opposite_column][opposite_index];
    });

    CubeHelper.indexIterator(index => {
      const opposite_index = CubeHelper.oppositeIndex(index);
      this.bottom.cells[opposite_column][index] = this.left.cells[index][column];
      this.left.cells[index][column] = first[opposite_index];
    });

    this.handleHistory(new Move(column, MoveInstructions.Down2.direction), record_move);
  }

  private moveDown(column: number, record_move = true) {
    if (column === 0) { this.left.rotateLeft(); }
    if (column === 2) { this.right.rotateRight(); }
    this.moveVertical(MoveInstructions.Down, column, record_move);
  }

  private moveUp(column: number, record_move = true) {
    if (column === 0) { this.left.rotateRight(); }
    if (column === 2) { this.right.rotateLeft(); }
    this.moveVertical(MoveInstructions.Up, column, record_move);
  }

  private moveRight(row: number, record_move = true) {
    if (row === 0) { this.top.rotateRight(); }
    if (row === 2) { this.bottom.rotateLeft(); }
    this.moveHorizontal(MoveInstructions.Right, row, record_move);
  }

  private moveLeft(row: number, record_move = true) {
    if (row === 0) { this.top.rotateLeft(); }
    if (row === 2) { this.bottom.rotateRight(); }
    this.moveHorizontal(MoveInstructions.Left, row, record_move);
  }

  private moveHorizontal(instructions: MoveInstruction, row, record_move = true) {
    const first = this[instructions.start_with].cells[row];
    const opposite_row = CubeHelper.oppositeIndex(row);
    instructions.moves.forEach(move => {
      this[move.to].cells[row] = move.from === SidePosition.Back ? this[move.from].cells[opposite_row].reverse()
                                                                 : this[move.from].cells[row];
    });
    this[instructions.end_with].cells[opposite_row] = first.reverse();
    this.handleHistory(new Move(row, instructions.direction), record_move);
  }

  private moveVertical(instructions: MoveInstruction, column, record_move = true) {
    CubeHelper.indexIterator(cell => {
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
}
