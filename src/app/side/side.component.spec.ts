import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideComponent } from './side.component';
import { Side } from '../side';

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
    component.invert = false;
    component.side = new Side('red');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
