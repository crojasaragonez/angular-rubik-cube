import { Direction } from '../enums';

export class Move {
  constructor(public value: number, public action: Direction) { }

  undo(): Move {
    if (this.action === Direction.Up) { return new Move(this.value, Direction.Down); }
    if (this.action === Direction.Up2) { return new Move(this.value, Direction.Down2); }
    if (this.action === Direction.Down) { return new Move(this.value, Direction.Up); }
    if (this.action === Direction.Down2) { return new Move(this.value, Direction.Up2); }
    if (this.action === Direction.Left) { return new Move(this.value, Direction.Right); }
    return new Move(this.value, Direction.Left);
  }
}
