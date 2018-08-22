import { Component, Input } from '@angular/core';
import { Cube, Side } from '../models';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent {

  @Input() cube: Cube;
  @Input() side: Side;

  select(x, y) {
    this.side.selectCell(x, y);
  }
}
