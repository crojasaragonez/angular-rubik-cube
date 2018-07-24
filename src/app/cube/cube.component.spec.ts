import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CubeComponent } from './cube.component';
import { CubeControlsComponent } from '../cube-controls/cube-controls.component';
import { SideComponent } from '../side/side.component';
import { Cube } from '../cube';

describe('CubeComponent', () => {
  let component: CubeComponent;
  let fixture: ComponentFixture<CubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CubeComponent, CubeControlsComponent, SideComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
