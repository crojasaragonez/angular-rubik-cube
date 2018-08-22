import { Side } from './side';
import { Cell } from './cell';
import { Location } from './location';
import { CurrentSelection } from './current-selection';
import { SidePosition, Color } from '../enums';

describe('Side', () => {
  const instance = new Side(Color.Red, SidePosition.Top);
  it('should have the correct dimensions', () => {
    expect(instance.cells.length).toEqual(3);
    expect(instance.cells[0].length).toEqual(3);
  });

  describe('selectCell', () => {
    it('should change some properties in the class', () => {
      instance.selectCell(1, 1);
      expect(CurrentSelection.location).toEqual(new Location(1, 1));
    });
  });

  describe('rotateLeft', () => {
    beforeEach(() => {
      instance.cells = [
        [new Cell(Color.Red), new Cell(Color.Red), new Cell(Color.Red)],
        [new Cell(Color.White), new Cell(Color.White), new Cell(Color.White)],
        [new Cell(Color.Yellow), new Cell(Color.Yellow), new Cell(Color.Yellow)]
      ];
    });

    it('should rotate the side', () => {
      const expected_result = [
        [new Cell(Color.Yellow), new Cell(Color.White), new Cell(Color.Red)],
        [new Cell(Color.Yellow), new Cell(Color.White), new Cell(Color.Red)],
        [new Cell(Color.Yellow), new Cell(Color.White), new Cell(Color.Red)]
      ];
      instance.rotateLeft();
      expect(instance.cells).toEqual(expected_result);
    });
  });

  describe('rotateRight', () => {
    beforeEach(() => {
      instance.cells = [
        [new Cell(Color.Red), new Cell(Color.Red), new Cell(Color.Red)],
        [new Cell(Color.White), new Cell(Color.White), new Cell(Color.White)],
        [new Cell(Color.Yellow), new Cell(Color.Yellow), new Cell(Color.Yellow)]
      ];
    });

    it('should rotate the side', () => {
      const expected_result = [
        [new Cell(Color.Red), new Cell(Color.White), new Cell(Color.Yellow)],
        [new Cell(Color.Red), new Cell(Color.White), new Cell(Color.Yellow)],
        [new Cell(Color.Red), new Cell(Color.White), new Cell(Color.Yellow)]
      ];
      instance.rotateRight();
      expect(instance.cells).toEqual(expected_result);
    });
  });
});
