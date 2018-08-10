import { Component, Input } from '@angular/core';
import { Side } from '../side';
import { Cube } from '../cube';
import { SidePosition } from '../enums';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent {

  @Input() cube: Cube;
  @Input() side: Side;

  select(x, y) {
    this.cube.resetSelection();
    this.side.selectCell(x, y);
  }
}
