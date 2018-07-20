export enum Direction {
  Up = "moveUp",
  Down = "moveDown",
  Left = "moveLeft",
  Right = "moveRight",
}

export class Move {
  value: number;
  action: Direction;
  constructor(value, action: Direction) {
    this.action = action;
    this.value = value;
  }

  undo() {
    if (this.action == Direction.Up) return Direction.Down;
    if (this.action == Direction.Down) return Direction.Up;
    if (this.action == Direction.Left) return Direction.Right;
    return Direction.Left;
  }
}
