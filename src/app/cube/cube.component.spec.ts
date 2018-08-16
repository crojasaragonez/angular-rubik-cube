import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CubeComponent } from './cube.component';
import { CubeControlsComponent } from '../cube-controls/cube-controls.component';
import { SideComponent } from '../side/side.component';
import { Mode, UserAction } from '../enums';
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
    space3d = fixture.nativeElement.querySelector('.cube-container');
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

    describe('no side is selected', () => {
      it('should not perform the move', () => {
        component.cube.resetSelection();
        component['performMove'](2);
        expect(component.cube.history.length).toEqual(0);
      });
    });
  });

  describe('keydown event', () => {
    const event = new Event('keydown', { bubbles: true });
    beforeEach(() => { component.mode = Mode.Move; });
    it('should handle keydown events', () => {
      spyOn(event, 'preventDefault');
      space3d.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not do anything if mode is set to Move', () => {
      spyOn(component.cube, 'move');
      space3d.dispatchEvent(event);
      expect(component.cube.move).not.toHaveBeenCalled();
    });

    it('should move the cube if mode is set to Play', () => {
      component.mode = Mode.Play;
      event['keyCode'] = UserAction.UpKey;
      spyOn(component.cube, 'move');
      space3d.dispatchEvent(event);
      expect(component.cube.move).toHaveBeenCalled();
    });

    it('should handle Ctrl + z', () => {
      event['ctrlKey'] = true;
      event['keyCode'] = UserAction.Zkey;
      spyOn(component.cube, 'undo');
      space3d.dispatchEvent(event);
      expect(component.cube.undo).toHaveBeenCalled();
    });

    it('should rotate horizontally to the right', () => {
      event['keyCode'] = UserAction.RightKey;
      space3d.dispatchEvent(event);
      expect(component.cube.rotateY).toEqual(41);
    });

    it('should rotate horizontally to the left', () => {
      event['keyCode'] = UserAction.LeftKey;
      space3d.dispatchEvent(event);
      expect(component.cube.rotateY).toEqual(31);
    });

    it('should rotate vertically up', () => {
      event['keyCode'] = UserAction.UpKey;
      space3d.dispatchEvent(event);
      expect(component.cube.rotateX).toEqual(-23);
    });

    it('should rotate vertically down', () => {
      event['keyCode'] = UserAction.DownKey;
      space3d.dispatchEvent(event);
      expect(component.cube.rotateX).toEqual(-13);
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
      const spyClientY = spyOnProperty(event, 'clientY', 'get');
      const spyClientX = spyOnProperty(event, 'clientX', 'get');
      space3d.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.last).toEqual(event);
      expect(spyClientY).toHaveBeenCalled();
      expect(spyClientX).toHaveBeenCalled();
    });

    it('should not do anything if mouseDown is false', () => {
      component.mouseDown = false;
      const spyClientY = spyOnProperty(event, 'clientY', 'get');
      const spyClientX = spyOnProperty(event, 'clientX', 'get');
      space3d.dispatchEvent(event);
      expect(spyClientY).not.toHaveBeenCalled();
      expect(spyClientX).not.toHaveBeenCalled();
    });
  });

  describe('swipe event', () => {
    it('should call performMove with the given parameter', () => {
      spyOn(component as any, 'performMove');
      const event = { direction: UserAction.SwipeRight };
      component.onTap(event);
      expect(component['performMove']).toHaveBeenCalledWith(event.direction);
    });
  });
});
