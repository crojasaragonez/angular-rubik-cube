import { Direction, SidePosition } from './enums';
import { MoveIntruction } from './move-intruction';

export class MoveIntructions {
  static Left: MoveIntruction = {
    start_with: SidePosition.Left,
    end_with: SidePosition.Back,
    direction: Direction.Left,
    moves: [
      { from: SidePosition.Front, to: SidePosition.Left },
      { from: SidePosition.Right, to: SidePosition.Front },
      { from: SidePosition.Back, to: SidePosition.Right },
    ]
  };
  static Right: MoveIntruction = {
    start_with: SidePosition.Right,
    end_with: SidePosition.Back,
    direction: Direction.Right,
    moves: [
      { from: SidePosition.Front, to: SidePosition.Right },
      { from: SidePosition.Left, to: SidePosition.Front },
      { from: SidePosition.Back, to: SidePosition.Left }
    ]
  };
  static Up: MoveIntruction = {
    start_with: SidePosition.Front,
    end_with: SidePosition.Top,
    direction: Direction.Up,
    moves: [
      { from: SidePosition.Bottom, to: SidePosition.Front },
      { from: SidePosition.Back, to: SidePosition.Bottom },
      { from: SidePosition.Top, to: SidePosition.Back },
    ]
  };
  static Up2: MoveIntruction = {
    start_with: SidePosition.Top,
    direction: Direction.Up2,
  };
  static Down: MoveIntruction = {
    start_with: SidePosition.Front,
    end_with: SidePosition.Bottom,
    direction: Direction.Down,
    moves: [
      { from: SidePosition.Top, to: SidePosition.Front },
      { from: SidePosition.Back, to: SidePosition.Top },
      { from: SidePosition.Bottom, to: SidePosition.Back },
    ]
  };
  static Down2: MoveIntruction = {
    start_with: SidePosition.Top,
    direction: Direction.Down2,
  };
}


