import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CubeComponent } from './cube.component';
import { CubeControlsComponent } from '../cube-controls/cube-controls.component';
import { SideComponent } from '../side/side.component';
import { Mode } from '../enums';
import 'hammerjs';

describe('CubeComponent', () => {
  let component: CubeComponent;
  let fixture: ComponentFixture<CubeComponent>;
  let space3d: HTMLElement;

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
    space3d = fixture.nativeElement.querySelector('.space3d');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('performMove', () => {
    describe('Play mode enabled', () => {
      it('should perform the move', () => {
        component['performMove'](2);
        expect(component.cube.history.length).toEqual(1);
      });
    });
  });

  describe('keydown event', () => {
    beforeEach(() => { component.mode = Mode.Move; });
    it('should handle keydown events', () => {
      const event = new KeyboardEvent('keydown', { bubbles: true });
      spyOn(event, 'preventDefault');
      space3d.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('mouseup event', () => {
    it('should handle mouseup event', () => {
      const event = new MouseEvent('mouseup', { bubbles: true });
      space3d.dispatchEvent(event);
      expect(component.mouseDown).toBeFalsy();
    });
  });

  describe('mousedown event', () => {
    it('should handle mousedown event', () => {
      const event = new MouseEvent('mousedown', { bubbles: true });
      space3d.dispatchEvent(event);
      expect(component.mouseDown).toBeTruthy();
      expect(component.last).toEqual(event);
    });
  });

  describe('mousemove event', () => {
    const event = new MouseEvent('mousemove', { bubbles: true });
    beforeEach(() => {
      component.mode = Mode.Move;
      component.mouseDown = true;
      component.last = event;
    });
    it('should handle mousemove events', () => {
      spyOn(event, 'preventDefault');
      space3d.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
