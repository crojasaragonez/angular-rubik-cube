import { Color } from '../enums';
import { CurrentSelection } from './current-selection';
import { Side } from './side';

export class Cell {
  constructor(public color: Color, public text: string = '') {
  }

  isSelected(x, y, side: Side){
    return CurrentSelection.location.x === x &&
           CurrentSelection.location.y === y &&
           CurrentSelection.side === side;
  }
}
