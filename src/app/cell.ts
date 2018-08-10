import { Color } from './enums';

export class Cell {
  constructor(public color: Color, public text: string = '', public selected: boolean = false) {
  }
}
