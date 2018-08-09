import { Move } from './move';
import { Side } from './side';
import { Direction, SidePosition, UserAction } from './enums';
import { CubeHelper } from './cube-helper';

// Turns a user action (key down or swipe action) into a Move object
export class UserActionInterpreter {
  readonly RIGHT_CODES = [UserAction.RightKey, UserAction.SwipeRight];
  readonly LEFT_CODES  = [UserAction.LeftKey, UserAction.SwipeLeft];
  readonly DOWN_CODES  = [UserAction.DownKey, UserAction.SwipeDown];
  readonly UP_CODES    = [UserAction.UpKey, UserAction.SwipeUp];
  constructor(private side: Side) {

  }

  resolve(code: number): Move {
    if (this.RIGHT_CODES.includes(code)) {
      if (this.side.position === SidePosition.Top) {
        return new Move(this.side.selectedCellLocation.x, Direction.Up2);
      }
      if (this.side.position === SidePosition.Bottom) {
        return new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.x), Direction.Down2);
      }
      return new Move(this.side.selectedCellLocation.x, Direction.Right);
    }
    if (this.LEFT_CODES.includes(code)) {
      if (this.side.position === SidePosition.Top) {
        return new Move(this.side.selectedCellLocation.x, Direction.Down2);
      }
      if (this.side.position === SidePosition.Bottom) {
        return new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.x), Direction.Up2);
      }
      return new Move(this.side.selectedCellLocation.x, Direction.Left);
    }
    if (this.DOWN_CODES.includes(code)) {
      if (this.side.position === SidePosition.Left) {
        return new Move(this.side.selectedCellLocation.y, Direction.Down2);
      }
      if (this.side.position === SidePosition.Back) {
        return new Move(this.side.selectedCellLocation.y, Direction.Up);
      }
      if (this.side.position === SidePosition.Right) {
        return new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.y), Direction.Up2);
      }
      return new Move(this.side.selectedCellLocation.y, Direction.Down);
    }
    if (this.UP_CODES.includes(code)) {
      if (this.side.position === SidePosition.Left) {
        return new Move(this.side.selectedCellLocation.y, Direction.Up2);
      }
      if (this.side.position === SidePosition.Back) {
        return new Move(this.side.selectedCellLocation.y, Direction.Down);
      }
      if (this.side.position === SidePosition.Right) {
        return new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.y), Direction.Down2);
      }
      return new Move(this.side.selectedCellLocation.y, Direction.Up);
    }
  }
}
