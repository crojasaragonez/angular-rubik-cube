import { Move, CurrentSelection } from './models';
import { Direction, SidePosition, UserAction } from './enums';
import { CubeHelper } from './cube-helper';

// Turns a user action (key down or swipe action) into a Move object
export class UserActionInterpreter {
  private readonly RIGHT_MOVES = {};
  private readonly LEFT_MOVES = {};
  private readonly DOWN_MOVES = {};
  private readonly UP_MOVES = {};
  constructor() {
    this.RIGHT_MOVES[SidePosition.Top]    = new Move(CurrentSelection.location.x, Direction.Up2);
    this.RIGHT_MOVES[SidePosition.Bottom] = new Move(CubeHelper.oppositeIndex(CurrentSelection.location.x), Direction.Down2);
    this.RIGHT_MOVES[SidePosition.Back]   = new Move(CubeHelper.oppositeIndex(CurrentSelection.location.x), Direction.Right);

    this.LEFT_MOVES[SidePosition.Top]     = new Move(CurrentSelection.location.x, Direction.Down2);
    this.LEFT_MOVES[SidePosition.Bottom]  = new Move(CubeHelper.oppositeIndex(CurrentSelection.location.x), Direction.Up2);
    this.LEFT_MOVES[SidePosition.Back]    = new Move(CubeHelper.oppositeIndex(CurrentSelection.location.x), Direction.Left);

    this.DOWN_MOVES[SidePosition.Left]    = new Move(CurrentSelection.location.y, Direction.Down2);
    this.DOWN_MOVES[SidePosition.Back]    = new Move(CurrentSelection.location.y, Direction.Up);
    this.DOWN_MOVES[SidePosition.Right]   = new Move(CubeHelper.oppositeIndex(CurrentSelection.location.y), Direction.Up2);

    this.UP_MOVES[SidePosition.Left]      = new Move(CurrentSelection.location.y, Direction.Up2);
    this.UP_MOVES[SidePosition.Back]      = new Move(CurrentSelection.location.y, Direction.Down);
    this.UP_MOVES[SidePosition.Right]     = new Move(CubeHelper.oppositeIndex(CurrentSelection.location.y), Direction.Down2);
  }

  resolve(code: number): Move {
    if ([UserAction.RightKey, UserAction.SwipeRight].includes(code)) {
      return this.RIGHT_MOVES[CurrentSelection.side.position] || new Move(CurrentSelection.location.x, Direction.Right);
    }
    if ([UserAction.LeftKey, UserAction.SwipeLeft].includes(code)) {
      return this.LEFT_MOVES[CurrentSelection.side.position] || new Move(CurrentSelection.location.x, Direction.Left);
    }
    if ([UserAction.DownKey, UserAction.SwipeDown].includes(code)) {
      return this.DOWN_MOVES[CurrentSelection.side.position] || new Move(CurrentSelection.location.y, Direction.Down);
    }
    if ([UserAction.UpKey, UserAction.SwipeUp].includes(code)) {
      return this.UP_MOVES[CurrentSelection.side.position] || new Move(CurrentSelection.location.y, Direction.Up);
    }
  }
}
