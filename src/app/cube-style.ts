import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CubeStyle {
  rotateX = -18;
  rotateY = 36;
  size = 250;

  cube() {
    return {
      transform: `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`
    };
  }

  cubeContainer() {
    return { width: `${this.size}px`, height: `${this.size}px` };
  }
}
