export class CubeHelper {
  static oppositeIndex(index) {
    if (index === 1) { return index; }
    return index === 0 ? 2 : 0;
  }

  static indexIterator(block: Function) {
    [0, 1, 2].forEach(index => block(index));
  }
}
