import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideComponent } from './side.component';
import { Side } from '../side';
import { Cube } from '../cube';
import { SidePosition, Color } from '../enums';

describe('SideComponent', () => {
  let component: SideComponent;
  let fixture: ComponentFixture<SideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideComponent);
    component = fixture.componentInstance;
    component.cube = new Cube();
    component.side = new Side(Color.Red, SidePosition.Top);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('select', () => {
    it('should the change current mode', () => {
      spyOn(component.cube, 'resetSelection');
      spyOn(component.side, 'selectCell');
      component.select(2, 2);
      expect(component.cube.resetSelection).toHaveBeenCalled();
      expect(component.side.selectCell).toHaveBeenCalledWith(2, 2);
    });
  });
});
