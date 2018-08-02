import { Side } from './side';
import { Cell } from './cell';
import { Location } from './location';
import { SidePosition } from './enums/side-position.enum';

describe('Side', () => {
  const instance = new Side('red', SidePosition.Top);
  it('should have the correct dimensions', () => {
    expect(instance.cells.length).toEqual(3);
    expect(instance.cells[0].length).toEqual(3);
  });

  describe('selectCell', () => {
    instance.selectCell(1, 1);

    it('should change some properties in the class', () => {
      expect(instance.selected).toBeTruthy();
      expect(instance.cells[1][1].selected).toBeTruthy();
      expect(instance.selectedCellLocation).toEqual(new Location(1, 1));
    });
  });

  describe('resetSelection', () => {
    it('should reset selected property', () => {
      instance.selectCell(1, 1);
      instance.resetSelection();
      expect(instance.selected).toBeFalsy();
      expect(instance.cells[1][1].selected).toBeFalsy();
      expect(instance.selectedCellLocation).toBeUndefined();
    });
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
