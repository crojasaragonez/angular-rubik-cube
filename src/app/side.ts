import { Cell } from './cell';
import { Cube } from './cube';
export class Side {
  cells: Cell[][];

  constructor(color: string) {
    this.cells = [
      [new Cell(color), new Cell(color), new Cell(color)],
      [new Cell(color), new Cell(color), new Cell(color)],
      [new Cell(color), new Cell(color), new Cell(color)],
    ];
  }

  selectCell(x: number, y: number) {
    this.cells[x][y].selected = true;
  }

  resetSelection() {
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.selected = false;
      })
    });
  }

  rotateLeft() {
    this.cells = [
      [this.cells[2][0], this.cells[1][0], this.cells[0][0]],
      [this.cells[2][1], this.cells[1][1], this.cells[0][1]],
      [this.cells[2][2], this.cells[1][2], this.cells[0][2]],
    ];
  }

  rotateRight() {
    this.cells = [
      [this.cells[0][2], this.cells[1][2], this.cells[2][2]],
      [this.cells[0][1], this.cells[1][1], this.cells[2][1]],
      [this.cells[0][0], this.cells[1][0], this.cells[2][0]],
    ];
  }
}
