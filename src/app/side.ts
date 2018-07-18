import { Cell } from './cell';
export class Side {
  cells: Cell[][];

  reset(color: string) {
    this.cells = [
      [new Cell(color), new Cell(color), new Cell(color)],
      [new Cell(color), new Cell(color), new Cell(color)],
      [new Cell(color), new Cell(color), new Cell(color)],
    ];
    return this;
  }
}
