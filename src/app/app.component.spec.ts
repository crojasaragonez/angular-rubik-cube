import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
import { CubeControlsComponent } from './cube-controls/cube-controls.component';
import { SideComponent } from './side/side.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CubeComponent,
        CubeControlsComponent,
        SideComponent
      ],
      imports: [FormsModule]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
