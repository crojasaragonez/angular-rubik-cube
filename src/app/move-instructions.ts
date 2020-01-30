import { Direction, SidePosition } from './enums';
import { MoveInstruction } from './move-instruction';

export class MoveInstructions {
  static Left: MoveInstruction = {
    start_with: SidePosition.Left,
    end_with: SidePosition.Back,
    direction: Direction.Left,
    moves: [
      { from: SidePosition.Front, to: SidePosition.Left },
      { from: SidePosition.Right, to: SidePosition.Front },
      { from: SidePosition.Back, to: SidePosition.Right },
    ]
  };
  static Right: MoveInstruction = {
    start_with: SidePosition.Right,
    end_with: SidePosition.Back,
    direction: Direction.Right,
    moves: [
      { from: SidePosition.Front, to: SidePosition.Right },
      { from: SidePosition.Left, to: SidePosition.Front },
      { from: SidePosition.Back, to: SidePosition.Left }
    ]
  };
  static Up: MoveInstruction = {
    start_with: SidePosition.Front,
    end_with: SidePosition.Top,
    direction: Direction.Up,
    moves: [
      { from: SidePosition.Bottom, to: SidePosition.Front },
      { from: SidePosition.Back, to: SidePosition.Bottom },
      { from: SidePosition.Top, to: SidePosition.Back },
    ]
  };
  static Up2: MoveInstruction = {
    start_with: SidePosition.Top,
    direction: Direction.Up2,
  };
  static Down: MoveInstruction = {
    start_with: SidePosition.Front,
    end_with: SidePosition.Bottom,
    direction: Direction.Down,
    moves: [
      { from: SidePosition.Top, to: SidePosition.Front },
      { from: SidePosition.Back, to: SidePosition.Top },
      { from: SidePosition.Bottom, to: SidePosition.Back },
    ]
  };
  static Down2: MoveInstruction = {
    start_with: SidePosition.Top,
    direction: Direction.Down2,
  };
}


