import { Cell } from './cell';
import { Cube } from './cube';
import { Location } from './location';
import { SidePosition } from './enums/side-position.enum';

export class Side {
  cells: Cell[][];
  selectedCellLocation: Location;

  constructor(color: string, public position: SidePosition, public selected: boolean = false) {
    this.cells = [
      [new Cell(color, false, '0,0'), new Cell(color, false, '0,1'), new Cell(color, false, '0,2')],
      [new Cell(color, false, '1,0'), new Cell(color, false, '1,1'), new Cell(color, false, '1,2')],
      [new Cell(color, false, '2,0'), new Cell(color, false, '2,2'), new Cell(color, false, '2,2')],
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
