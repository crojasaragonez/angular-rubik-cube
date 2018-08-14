import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CubeStyle {
  rotateX = -18;
  rotateY = 36;
  size = 250;

  sideSize() {
    return this.size / 2;
  }

  cube() {
    return {
      transform: `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`
    };
  }

  cubeContainer() {
    return { width: `${this.size}px`, height: `${this.size}px` };
  }

  front() {
    return { transform: `translate3d(0, 0, ${this.sideSize()}px)` };
  }

  top() {
    return { transform: `rotateX(90deg) translate3d(0, 0, ${this.sideSize()}px)` };
  }

  bottom() {
    return { transform: `rotateX(-90deg) translate3d(0, 0, ${this.sideSize()}px)` };
  }

  left() {
    return {
      left: '50%',
      'margin-left': `-${this.sideSize()}px`,
      transform: `rotateY(-90deg) translate3d(0, 0, ${this.sideSize()}px)`
    };
  }

  right() {
    return {
      left: '50%',
      'margin-left': `-${this.sideSize()}px`,
      transform: `rotateY(90deg) translate3d(0, 0, ${this.sideSize()}px)`
    };
  }

  back() {
    return {
      transform: `rotateX(180deg) translate3d(0, 0, ${this.sideSize()}px)`
    };
  }
}
