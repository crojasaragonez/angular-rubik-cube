export class CubeHelper {
  static oppositeIndex(index) {
    if (index === 1) { return index; }
    if (index === 0) { return 2; }
    return 0;
  }

  static indexIterator(block: Function) {
    [0, 1, 2].forEach(index => block(index));
  }
}
