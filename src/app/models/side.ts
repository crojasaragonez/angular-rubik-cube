import { Cell } from './cell';
import { Location } from './location';
import { SidePosition, Color } from '../enums';
import { CubeHelper } from '../cube-helper';

export class Side {
  cells: Cell[][];
  selectedCellLocation: Location;

  constructor(color: Color, public position: SidePosition, public selected: boolean = false) {
    this.cells = [
      [new Cell(color), new Cell(color), new Cell(color)],
      [new Cell(color), new Cell(color), new Cell(color)],
      [new Cell(color), new Cell(color), new Cell(color)],
    ];
  }

  selectCell(x: number, y: number) {
    this.cells[x][y].selected = true;
    this.selected = true;
    this.selectedCellLocation = new Location(x, y);
  }

  resetSelection() {
    this.cells.forEach(row => {
      row.forEach(cell => { cell.selected = false; });
    });
    this.selected = false;
    this.selectedCellLocation = undefined;
  }

  rotateLeft() {
    this.cells = [
      [this.cells[2][0], this.cells[1][0], this.cells[0][0]],
      [this.cells[2][1], this.cells[1][1], this.cells[0][1]],
      [this.cells[2][2], this.cells[1][2], this.cells[0][2]]
    ];
  }

  rotateRight() {
    this.cells = [
      [this.cells[0][2], this.cells[1][2], this.cells[2][2]],
      [this.cells[0][1], this.cells[1][1], this.cells[2][1]],
      [this.cells[0][0], this.cells[1][0], this.cells[2][0]]
    ];
  }
}
