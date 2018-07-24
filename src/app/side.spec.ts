import { Side } from './side';
import { Cell } from './cell';

describe('Side', () => {
  const instance = new Side('red');
  it('should have the correct dimensions', () => {
    expect(instance.cells.length).toEqual(3);
    expect(instance.cells[0].length).toEqual(3);
  });

  describe('rotateLeft', () => {
    beforeEach(() => {
      instance.cells = [
        [new Cell('red'), new Cell('red'), new Cell('red')],
        [new Cell('white'), new Cell('white'), new Cell('white')],
        [new Cell('black'), new Cell('black'), new Cell('black')]
      ];
    });

    it('should rotate the side', () => {
      const expected_result = [
        [new Cell('black'), new Cell('white'), new Cell('red')],
        [new Cell('black'), new Cell('white'), new Cell('red')],
        [new Cell('black'), new Cell('white'), new Cell('red')]
      ];
      instance.rotateLeft();
      expect(instance.cells).toEqual(expected_result);
    });
  });

  describe('rotateRight', () => {
    beforeEach(() => {
      instance.cells = [
        [new Cell('red'), new Cell('red'), new Cell('red')],
        [new Cell('white'), new Cell('white'), new Cell('white')],
        [new Cell('black'), new Cell('black'), new Cell('black')]
      ];
    });

    it('should rotate the side', () => {
      const expected_result = [
        [new Cell('red'), new Cell('white'), new Cell('black')],
        [new Cell('red'), new Cell('white'), new Cell('black')],
        [new Cell('red'), new Cell('white'), new Cell('black')]
      ];
      instance.rotateRight();
      expect(instance.cells).toEqual(expected_result);
    });
  });
});
