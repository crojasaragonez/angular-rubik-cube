import { Component, OnInit, Input } from '@angular/core';
import { Side } from '../side';
import { Cube } from '../cube';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  @Input() cube: Cube;
  @Input() side: Side;
  @Input() invert = false;

  row_indexes = [0, 1, 2];
  column_indexes = [0, 1, 2];
  constructor() { }

  ngOnInit() {
    if (this.invert) {
      this.column_indexes = this.column_indexes.reverse();
    }
  }

  select(x, y){
    this.cube.resetSelection();
    this.side.cells[x][y].selected = true;
  }
}
