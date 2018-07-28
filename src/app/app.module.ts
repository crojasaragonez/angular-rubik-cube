import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
import { SideComponent } from './side/side.component';
import { CubeControlsComponent } from './cube-controls/cube-controls.component';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
    'swipe': {
      direction: 31 // /!\ ugly hack to allow swipe in all direction
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    SideComponent,
    CubeControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
