import { Direction } from './enums/direction.enum';
import { SidePosition } from './enums/side-position.enum';
import { MoveIntruction } from './move-intruction';

export class MoveIntructions {
  static Left: MoveIntruction = {
    start_with: SidePosition.Front,
    end_with: SidePosition.Left,
    direction: Direction.Left,
    moves: [
      { from: SidePosition.Right, to: SidePosition.Front },
      { from: SidePosition.Back, to: SidePosition.Right },
      { from: SidePosition.Left, to: SidePosition.Back },
    ]
  };
  static Right: MoveIntruction = {
    start_with: SidePosition.Front,
    end_with: SidePosition.Right,
    direction: Direction.Right,
    moves: [
      { from: SidePosition.Left, to: SidePosition.Front },
      { from: SidePosition.Back, to: SidePosition.Left },
      { from: SidePosition.Right, to: SidePosition.Back },
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


