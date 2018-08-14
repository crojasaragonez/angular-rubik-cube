import { Move, Side } from './models';
import { Direction, SidePosition, UserAction } from './enums';
import { CubeHelper } from './cube-helper';

// Turns a user action (key down or swipe action) into a Move object
export class UserActionInterpreter {
  private readonly RIGHT_MOVES = {};
  private readonly LEFT_MOVES = {};
  private readonly DOWN_MOVES = {};
  private readonly UP_MOVES = {};
  constructor(private side: Side) {
    this.RIGHT_MOVES[SidePosition.Top]    = new Move(this.side.selectedCellLocation.x, Direction.Up2);
    this.RIGHT_MOVES[SidePosition.Bottom] = new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.x), Direction.Down2);
    this.RIGHT_MOVES[SidePosition.Back]   = new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.x), Direction.Right);

    this.LEFT_MOVES[SidePosition.Top]     = new Move(this.side.selectedCellLocation.x, Direction.Down2);
    this.LEFT_MOVES[SidePosition.Bottom]  = new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.x), Direction.Up2);
    this.LEFT_MOVES[SidePosition.Back]    = new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.x), Direction.Left);

    this.DOWN_MOVES[SidePosition.Left]    = new Move(this.side.selectedCellLocation.y, Direction.Down2);
    this.DOWN_MOVES[SidePosition.Back]    = new Move(this.side.selectedCellLocation.y, Direction.Up);
    this.DOWN_MOVES[SidePosition.Right]   = new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.y), Direction.Up2);

    this.UP_MOVES[SidePosition.Left]      = new Move(this.side.selectedCellLocation.y, Direction.Up2);
    this.UP_MOVES[SidePosition.Back]      = new Move(this.side.selectedCellLocation.y, Direction.Down);
    this.UP_MOVES[SidePosition.Right]     = new Move(CubeHelper.oppositeIndex(this.side.selectedCellLocation.y), Direction.Down2);
  }

  resolve(code: number): Move {
    if ([UserAction.RightKey, UserAction.SwipeRight].includes(code)) {
      return this.RIGHT_MOVES[this.side.position] || new Move(this.side.selectedCellLocation.x, Direction.Right);
    }
    if ([UserAction.LeftKey, UserAction.SwipeLeft].includes(code)) {
      return this.LEFT_MOVES[this.side.position] || new Move(this.side.selectedCellLocation.x, Direction.Left);
    }
    if ([UserAction.DownKey, UserAction.SwipeDown].includes(code)) {
      return this.DOWN_MOVES[this.side.position] || new Move(this.side.selectedCellLocation.y, Direction.Down);
    }
    if ([UserAction.UpKey, UserAction.SwipeUp].includes(code)) {
      return this.UP_MOVES[this.side.position] || new Move(this.side.selectedCellLocation.y, Direction.Up);
    }
  }
}
