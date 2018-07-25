import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CubeControlsComponent } from './cube-controls.component';
import { Cube } from '../cube';

describe('CubeControlsComponent', () => {
  let component: CubeControlsComponent;
  let fixture: ComponentFixture<CubeControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CubeControlsComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CubeControlsComponent);
    component = fixture.componentInstance;
    component.cube = new Cube();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
