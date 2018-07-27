import { Direction } from './enums/direction.enum';
import { SidePosition } from './enums/side-position.enum';

export class MoveBehaviour {
  static Left: MoveIntructions = {
    start_with: SidePosition.Front,
    direction: Direction.Left,
    moves: [
      { from: SidePosition.Front, to: SidePosition.Right },
      { from: SidePosition.Right, to: SidePosition.Back },
      { from: SidePosition.Back, to: SidePosition.Left },
      { from: SidePosition.Left, to: '' }
    ]
  };
  static Right: MoveIntructions = {
    start_with: SidePosition.Front,
    direction: Direction.Right,
    moves: [
      { from: SidePosition.Front, to: SidePosition.Left },
      { from: SidePosition.Left, to: SidePosition.Back },
      { from: SidePosition.Back, to: SidePosition.Right },
      { from: SidePosition.Right, to: '' }
    ]
  };
  static Up: MoveIntructions = {
    start_with: SidePosition.Front,
    direction: Direction.Up,
    moves: [
      { from: SidePosition.Front, to: SidePosition.Bottom },
      { from: SidePosition.Bottom, to: SidePosition.Back },
      { from: SidePosition.Back, to: SidePosition.Top },
      { from: SidePosition.Top, to: '' },
    ]
  };
  static Down: MoveIntructions = {
    start_with: SidePosition.Front,
    direction: Direction.Down,
    moves: [
      { from: SidePosition.Front, to: SidePosition.Top },
      { from: SidePosition.Top, to: SidePosition.Back },
      { from: SidePosition.Back, to: SidePosition.Bottom },
      { from: SidePosition.Bottom, to: '' },
    ]
  };
}

export interface MoveIntructions {
  start_with: string;
  direction: Direction;
  moves: any[];
}
