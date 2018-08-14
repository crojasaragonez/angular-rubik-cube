import { Move, Side } from './models';
import { Direction, SidePosition, UserAction } from './enums';
import { CubeHelper } from './cube-helper';

// Turns a user action (key down or swipe action) into a Move object
export class UserActionInterpreter {
  readonly RIGHT_CODES = [UserAction.RightKey, UserAction.SwipeRight];
  readonly LEFT_CODES  = [UserAction.LeftKey, UserAction.SwipeLeft];
  readonly DOWN_CODES  = [UserAction.DownKey, UserAction.SwipeDown];
  readonly UP_CODES    = [UserAction.UpKey, UserAction.SwipeUp];
  readonly RIGHT_MOVES = {
    'top': new Move(this.side.selectedCellLocation.x, Direction.Up2),
    'bottom': new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.x), Direction.Down2),
    'back': new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.x), Direction.Right)
  }
  readonly LEFT_MOVES = {
    'top': new Move(this.side.selectedCellLocation.x, Direction.Down2),
    'bottom': new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.x), Direction.Up2),
    'back': new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.x), Direction.Left)
  }
  readonly DOWN_MOVES = {
    'left': new Move(this.side.selectedCellLocation.y, Direction.Down2),
    'back': new Move(this.side.selectedCellLocation.y, Direction.Up),
    'right': new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.y), Direction.Up2)
  }
  readonly UP_MOVES = {
    'left': new Move(this.side.selectedCellLocation.y, Direction.Up2),
    'back': new Move(this.side.selectedCellLocation.y, Direction.Down),
    'right': new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.y), Direction.Down2)
  }
  constructor(private side: Side) {

  }

  resolve(code: number): Move {
    if (this.RIGHT_CODES.includes(code)) {
      return this.RIGHT_MOVES[this.side.position] || new Move(this.side.selectedCellLocation.x, Direction.Right);
    }
    if (this.LEFT_CODES.includes(code)) {
      return this.LEFT_MOVES[this.side.position] || new Move(this.side.selectedCellLocation.x, Direction.Left);
    }
    if (this.DOWN_CODES.includes(code)) {
      return this.DOWN_MOVES[this.side.position] || new Move(this.side.selectedCellLocation.y, Direction.Down);
    }
    if (this.UP_CODES.includes(code)) {
      return this.UP_MOVES[this.side.position] || new Move(this.side.selectedCellLocation.y, Direction.Up);
    }
  }
}
