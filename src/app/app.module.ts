import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
import { SideComponent } from './side/side.component';

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    SideComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
