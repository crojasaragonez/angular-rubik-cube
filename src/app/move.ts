export enum Direction {
  Up = 'moveUp',
  Down = 'moveDown',
  Left = 'moveLeft',
  Right = 'moveRight',
}

export class Move {
  constructor(public value, public action: Direction) { }

  undo() {
    if (this.action === Direction.Up) { return Direction.Down; }
    if (this.action === Direction.Down) { return Direction.Up; }
    if (this.action === Direction.Left) { return Direction.Right; }
    return Direction.Left;
  }
}
