import { Direction } from './move';
export class MoveBehaviour {
  static Left: MoveIntructions = {
    start_with: 'front',
    direction: Direction.Left,
    moves: [
      { from: 'front', to: 'right' },
      { from: 'right', to: 'back' },
      { from: 'back', to: 'left' },
      { from: 'left', to: '' }
    ]
  };
  static Right: MoveIntructions = {
    start_with: 'front',
    direction: Direction.Right,
    moves: [
      { from: 'front', to: 'left' },
      { from: 'left', to: 'back' },
      { from: 'back', to: 'right' },
      { from: 'right', to: '' }
    ]
  };
  static Up: MoveIntructions = {
    start_with: 'front',
    direction: Direction.Up,
    moves: [
      { from: 'front', to: 'bottom' },
      { from: 'bottom', to: 'back' },
      { from: 'back', to: 'top' },
      { from: 'top', to: '' },
    ]
  };
  static Down: MoveIntructions = {
    start_with: 'front',
    direction: Direction.Down,
    moves: [
      { from: 'front', to: 'top' },
      { from: 'top', to: 'back' },
      { from: 'back', to: 'bottom' },
      { from: 'bottom', to: '' },
    ]
  };
}

export interface MoveIntructions {
  start_with: string;
  direction: Direction;
  moves: any[];
}
