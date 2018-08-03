import { Cell } from './cell';
import { Cube } from './cube';
import { Location } from './location';
import { SidePosition } from './enums/side-position.enum';

export class Side {
  cells: Cell[][];
  selectedCellLocation: Location;

  constructor(color: string, public position: SidePosition, public selected: boolean = false) {
    this.cells = [
      [new Cell(color, '1'), new Cell(color, '2'), new Cell(color, '3')],
      [new Cell(color, '4'), new Cell(color, '5'), new Cell(color, '6')],
      [new Cell(color, '7'), new Cell(color, '8'), new Cell(color, '8')],
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
