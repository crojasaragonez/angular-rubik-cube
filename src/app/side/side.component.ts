import { Component, OnInit, Input } from '@angular/core';
import { Side } from '../side';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  @Input() side: Side;
  constructor() { }

  ngOnInit() {
  }

}
